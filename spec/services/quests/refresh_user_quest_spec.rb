require "rails_helper"

RSpec.shared_examples "a refresh user quest without creating new records" do
  it "does not create a new user quest record" do
    expect { subject }.not_to change(UserQuest, :count)
  end

  it "does not create a new participation point record" do
    expect { subject }.not_to change(ExperiencePoint, :count)
  end
end

RSpec.shared_examples "a refresh user quest that creates new records" do
  it "creates a new user quest record" do
    expect { subject }.to change(UserQuest, :count).from(0).to(1)
  end

  it "creates a new participation point record" do
    expect { subject }.to change(ExperiencePoint, :count).from(0).to(1)
  end

  it "creates the records with the correct arguments" do
    freeze_time do
      subject

      user_quest = UserQuest.last
      participation_point = ExperiencePoint.last

      aggregate_failures do
        expect(user_quest.quest).to eq quest
        expect(user_quest.user).to eq user
        expect(user_quest.completed_at).to eq Time.current
        expect(user_quest.credited_experience_points_amount).to eq quest.experience_points_amount

        expect(participation_point.source).to eq quest
        expect(participation_point.amount).to eq quest.experience_points_amount
        expect(participation_point.credited_at).to eq Time.current
        expect(participation_point.description).to eq "Completed #{quest.title}"
      end
    end
  end

  context "when notify is true" do
    let(:notify) { true }

    let(:create_notification_class) { CreateNotification }
    let(:create_notification_instance) { instance_double(create_notification_class, call: true) }

    before do
      allow(create_notification_class).to receive(:new).and_return(create_notification_instance)
    end

    it "calls the create notification service" do
      subject

      expect(create_notification_instance).to have_received(:call).with(
        recipient: user,
        source_id: quest.id,
        type: QuestCompletedNotification,
        extra_params: {source_type: "Quest", experience_points: quest.experience_points_amount, tal_reward: quest.tal_reward}
      )
    end
  end

  context "when the quest has a tal reward" do
    let(:tal_reward) { 10 }

    let(:virtual_tal_class) { Web3::MintVirtualTal }
    let(:virtual_tal_instance) { instance_double(virtual_tal_class, call: true) }

    before do
      allow(virtual_tal_class).to receive(:new).and_return(virtual_tal_instance)
    end

    it "calls the mint tal reward service" do
      subject

      expect(virtual_tal_class).to have_received(:new).with(
        chain_id: 44787
      )
      expect(virtual_tal_instance).to have_received(:call).with(
        amount: tal_reward, to: user.wallet_id, reason: "in_app_rewards"
      )
    end
  end
end

RSpec.describe Quests::RefreshUserQuest do
  include ActiveJob::TestHelper

  subject(:refresh_user_quest) { described_class.new(quest: quest, user: user, notify: notify).call }

  let(:user) { create :user, :with_talent, wallet_id: wallet_id }
  let(:talent) { user.talent }
  let(:wallet_id) { SecureRandom.hex }

  let!(:quest) { create :quest, quest_type: quest_type, tal_reward: tal_reward }
  let(:quest_type) { "profile_picture" }
  let(:notify) { false }
  let(:tal_reward) { nil }

  context "when the quest was not credited yet" do
    context "when the quest type is profile_picture" do
      let(:quest_type) { "profile_picture" }

      context "when the quest was completed" do
        before do
          picture_data = {
            id: "b7d3e25bd98cf67b7eb485f62679bc39.jpeg",
            storage: "cache",
            metadata: {
              size: 22078,
              filename: "5319238.jpeg",
              mime_type: "image/jpeg"
            }
          }
          talent.update(profile_picture_data: picture_data)
        end

        it_behaves_like "a refresh user quest that creates new records"
      end

      context "when the quest was not completed" do
        it_behaves_like "a refresh user quest without creating new records"
      end
    end

    context "when the quest type is three_journey_entries" do
      let(:quest_type) { "three_journey_entries" }

      context "when the quest was completed" do
        before do
          create :goal, user: user, due_date: Date.tomorrow
          create :milestone, talent: talent
          create :milestone, talent: talent
        end

        it_behaves_like "a refresh user quest that creates new records"
      end

      context "when the quest was not completed" do
        before do
          create :goal, user: user, due_date: Date.tomorrow
          create :milestone, talent: talent
        end

        it_behaves_like "a refresh user quest without creating new records"
      end
    end

    context "when the quest type is send_career_update" do
      let(:quest_type) { "send_career_update" }

      context "when the quest was completed" do
        before do
          create :career_update, user: user
        end

        it_behaves_like "a refresh user quest that creates new records"
      end

      context "when the quest was not completed" do
        it_behaves_like "a refresh user quest without creating new records"
      end
    end

    context "when the quest type is three_talent_subscribe" do
      let(:quest_type) { "three_talent_subscribe" }

      context "when the quest was completed" do
        before do
          user_1 = create :user
          user_2 = create :user
          user_3 = create :user
          create :subscription, user: user_1, subscriber: user
          create :subscription, user: user_2, subscriber: user
          create :subscription, user: user_3, subscriber: user
        end

        it_behaves_like "a refresh user quest that creates new records"
      end

      context "when the quest was not completed" do
        it_behaves_like "a refresh user quest without creating new records"
      end
    end

    context "when the quest type is verify_identity" do
      let(:quest_type) { "verify_identity" }

      let(:create_notification_class) { CreateNotification }
      let(:create_notification_instance) { instance_double(create_notification_class, call: true) }

      before do
        allow(create_notification_class).to receive(:new).and_return(create_notification_instance)
      end

      context "when the quest was completed and notify is true" do
        let(:notify) { true }

        before do
          talent.update!(verified: true)
        end

        it_behaves_like "a refresh user quest that creates new records"

        it "initializes and calls the create notification service" do
          refresh_user_quest

          expect(create_notification_class).to have_received(:new).twice
          expect(create_notification_instance).to have_received(:call).with(
            recipient: user,
            source_id: user.id,
            type: VerifiedProfileNotification
          )
          expect(create_notification_instance).to have_received(:call).with(
            recipient: user,
            source_id: quest.id,
            type: QuestCompletedNotification,
            extra_params: {source_type: "Quest", experience_points: quest.experience_points_amount, tal_reward: quest.tal_reward}
          )
        end

        it "enqueues a job to whitelist the user" do
          Sidekiq::Testing.inline! do
            refresh_user_quest

            job = enqueued_jobs.find { |j| j["job_class"] == "WhitelistUserJob" }

            aggregate_failures do
              expect(job["arguments"][0]["level"]).to eq("verified")
              expect(job["arguments"][0]["user_id"]).to eq(user.id)
            end
          end
        end

        context "when the notify flag is set to false" do
          let(:notify) { false }

          it "does not initializes the create notification service" do
            refresh_user_quest

            expect(create_notification_class).not_to have_received(:new)
          end
        end

        context "when the user was invited" do
          let(:invite) { create :invite }

          let(:credit_points_class) { ExperiencePoints::CreditInvitePoints }
          let(:credit_points_instance) { instance_double(credit_points_class, call: true) }

          before do
            user.update(invite_id: invite.id)
            allow(credit_points_class).to receive(:new).and_return(credit_points_instance)
          end

          it "initializes and calls the credit points service" do
            refresh_user_quest

            expect(credit_points_class).to have_received(:new).with(
              invite: invite
            )
            expect(credit_points_instance).to have_received(:call)
          end
        end
      end

      context "when the quest was not completed" do
        it_behaves_like "a refresh user quest without creating new records"

        it "does not initializes the create notification service" do
          refresh_user_quest

          expect(create_notification_class).not_to have_received(:new)
        end
      end
    end

    context "when the quest type is five_subscribers" do
      let(:quest_type) { "five_subscribers" }

      context "when the quest was completed" do
        before do
          user_1 = create :user
          user_2 = create :user
          user_3 = create :user
          user_4 = create :user
          user_5 = create :user
          create :subscription, user: user, subscriber: user_1
          create :subscription, user: user, subscriber: user_2
          create :subscription, user: user, subscriber: user_3
          create :subscription, user: user, subscriber: user_4
          create :subscription, user: user, subscriber: user_5
        end

        it_behaves_like "a refresh user quest that creates new records"
      end

      context "when the quest was not completed" do
        it_behaves_like "a refresh user quest without creating new records"
      end
    end

    context "when the quest type is supporting_three" do
      let(:quest_type) { "supporting_three" }

      context "when the quest was completed" do
        before do
          user_1 = create :user, :with_talent_token
          user_2 = create :user, :with_talent_token
          user_3 = create :user, :with_talent_token
          # 12 usd invested
          create :talent_supporter, supporter_wallet_id: user.wallet_id, talent_contract_id: user_1.talent.talent_token.contract_id, tal_amount: "500000000000000000000"
          create :talent_supporter, supporter_wallet_id: user.wallet_id, talent_contract_id: user_2.talent.talent_token.contract_id, tal_amount: "50000000000000000000"
          create :talent_supporter, supporter_wallet_id: user.wallet_id, talent_contract_id: user_3.talent.talent_token.contract_id, tal_amount: "50000000000000000000"
        end

        it_behaves_like "a refresh user quest that creates new records"
      end

      context "when the quest was not completed" do
        before do
          # Low amounts invested
          user_1 = create :user, :with_talent_token
          user_2 = create :user, :with_talent_token
          user_3 = create :user, :with_talent_token
          create :talent_supporter, supporter_wallet_id: user.wallet_id, talent_contract_id: user_1.talent.talent_token.contract_id, tal_amount: "10000000000000"
          create :talent_supporter, supporter_wallet_id: user.wallet_id, talent_contract_id: user_2.talent.talent_token.contract_id, tal_amount: "10000000000000"
          create :talent_supporter, supporter_wallet_id: user.wallet_id, talent_contract_id: user_3.talent.talent_token.contract_id, tal_amount: "10000000000000"
        end

        it_behaves_like "a refresh user quest without creating new records"
      end
    end

    context "when the quest type is connect_wallet" do
      let(:quest_type) { "connect_wallet" }

      context "when the quest was completed" do
        let(:wallet_id) { SecureRandom.hex }

        it_behaves_like "a refresh user quest that creates new records"
      end

      context "when the quest was not completed" do
        let(:wallet_id) { nil }

        it_behaves_like "a refresh user quest without creating new records"
      end
    end

    context "when the quest type is complete_profile" do
      let(:quest_type) { "complete_profile" }

      context "when the quest was completed" do
        before do
          allow_any_instance_of(User).to receive(:profile_complete_quest_completed?).and_return(true)
        end

        it_behaves_like "a refresh user quest that creates new records"
      end

      context "when the quest was not completed" do
        it_behaves_like "a refresh user quest without creating new records"
      end
    end

    context "when the quest type is verify_humanity" do
      let(:quest_type) { "verify_humanity" }

      context "when the quest was completed" do
        before do
          user.update(humanity_verified_at: Time.current)
        end

        it_behaves_like "a refresh user quest that creates new records"
      end

      context "when the quest was not completed" do
        it_behaves_like "a refresh user quest without creating new records"
      end
    end

    context "when the quest type is create_talent_mate" do
      let(:quest_type) { "create_talent_mate" }
      let(:eth_client_class) { Eth::Client }
      let(:client) { instance_double(eth_client_class) }

      before do
        user.talent.update!(verified: true)
        allow(eth_client_class).to receive(:create).and_return(client)
        allow(client).to receive(:call).and_return(talent_mates_count)
      end

      context "when the quest was completed" do
        let(:talent_mates_count) { 1 }

        it_behaves_like "a refresh user quest that creates new records"
      end

      context "when the quest was not completed" do
        let(:talent_mates_count) { 0 }

        it_behaves_like "a refresh user quest without creating new records"
      end
    end

    context "when the quest type is three_token_holders" do
      let(:quest_type) { "three_token_holders" }
      let(:talent_token) { create :talent_token, talent: user.talent }

      context "when the quest was completed" do
        before do
          create :talent_supporter, talent_contract_id: talent_token.contract_id
          create :talent_supporter, talent_contract_id: talent_token.contract_id
          create :talent_supporter, talent_contract_id: talent_token.contract_id
        end

        it_behaves_like "a refresh user quest that creates new records"
      end

      context "when the quest was not completed" do
        it_behaves_like "a refresh user quest without creating new records"
      end
    end

    context "when the quest type is sponsor_talent" do
      let(:quest_type) { "sponsor_talent" }

      context "when the quest was completed" do
        before do
          create :sponsorship, sponsor: user.wallet_id, symbol: "USDC", amount: 2500000, token_decimals: 6
          create :sponsorship, sponsor: user.wallet_id, symbol: "USDC", amount: 2500000000000000000, token_decimals: 18
        end

        it_behaves_like "a refresh user quest that creates new records"
      end

      context "when the quest was not completed" do
        it_behaves_like "a refresh user quest without creating new records"
      end
    end

    context "when the quest type is invite_three" do
      let(:quest_type) { "invite_three" }
      let(:invite) { create :invite, user: user }
      let(:user_invited_1) { create :user, invite_id: invite.id, created_at: DateTime.now }
      let(:user_invited_2) { create :user, invite_id: invite.id, created_at: DateTime.now }
      let(:user_invited_3) { create :user, invite_id: invite.id, created_at: DateTime.now }

      context "when the quest was completed" do
        before do
          create :talent, user: user_invited_1, verified: true
          create :talent, user: user_invited_2, verified: true
          create :talent, user: user_invited_3, verified: true
        end

        it_behaves_like "a refresh user quest that creates new records"
      end

      context "when the quest was not completed" do
        it_behaves_like "a refresh user quest without creating new records"
      end
    end

    context "when the quest type is active_goal" do
      let(:quest_type) { "active_goal" }

      context "when the quest was completed" do
        before do
          create :goal, due_date: Date.current, progress: Goal::DOING, user:
        end

        it_behaves_like "a refresh user quest that creates new records"
      end

      context "when the quest was not completed" do
        it_behaves_like "a refresh user quest without creating new records"
      end
    end

    context "when the quest type is galxe_verification" do
      let(:quest_type) { "galxe_verification" }

      context "when the quest was completed" do
        before do
          create :user_web3_info, user: user, galxe_passport_token_id: "123456"
        end

        it_behaves_like "a refresh user quest that creates new records"
      end

      context "when the quest was not completed" do
        it_behaves_like "a refresh user quest without creating new records"
      end
    end

    context "when the quest type is galxe_verification" do
      let(:quest_type) { "takeoff_vote" }
      let!(:org) { create :org_election, slug: "takeoff-istanbul" }
      let!(:election) { create :election, organization: org }

      context "when the quest was completed" do
        before do
          create :vote, voter: user, election: election
        end

        it_behaves_like "a refresh user quest that creates new records"
      end

      context "when the quest was not completed" do
        it_behaves_like "a refresh user quest without creating new records"
      end
    end
  end

  context "when the quest was already credited for the user" do
    before do
      create :user_quest, quest: quest, user: user
    end

    it_behaves_like "a refresh user quest without creating new records"
  end
end
