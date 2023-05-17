require "rails_helper"

RSpec.shared_examples "a refresh user quest without creating new records" do
  it "does not create a new user quest record" do
    expect { subject }.not_to change(UserV2Quest, :count)
  end

  it "does not create a new participation point record" do
    expect { subject }.not_to change(ParticipationPoint, :count)
  end
end

RSpec.shared_examples "a refresh user quest that creates new records" do
  it "creates a new user quest record" do
    expect { subject }.to change(UserV2Quest, :count).from(0).to(1)
  end

  it "creates a new participation point record" do
    expect { subject }.to change(ParticipationPoint, :count).from(0).to(1)
  end

  it "creates the records with the correct arguments" do
    freeze_time do
      subject

      user_quest = UserV2Quest.last
      participation_point = ParticipationPoint.last

      aggregate_failures do
        expect(user_quest.v2_quest).to eq quest
        expect(user_quest.user).to eq user
        expect(user_quest.completed_at).to eq Time.current
        expect(user_quest.credited_amount).to eq quest.participation_points_amount

        expect(participation_point.amount).to eq quest.participation_points_amount
        expect(participation_point.credited_at).to eq Time.current
        expect(participation_point.description).to eq "Completed #{quest.title}"
      end
    end
  end
end

RSpec.describe Quests::RefreshUserQuest do
  subject(:refresh_user_quest) { described_class.new(quest: quest, user: user).call }

  let(:user) { create :user, :with_talent }
  let(:talent) { user.talent }

  let!(:quest) { create :v2_quest, quest_type: quest_type }
  let(:quest_type) { "profile_picture" }

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
          career_goal = create :career_goal, talent: talent
          create :goal, career_goal: career_goal, due_date: Date.tomorrow
          create :milestone, talent: talent
          create :milestone, talent: talent
        end

        it_behaves_like "a refresh user quest that creates new records"
      end

      context "when the quest was not completed" do
        before do
          # Only two of them
          career_goal = create :career_goal, talent: talent
          create :goal, career_goal: career_goal, due_date: Date.tomorrow
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

      context "when the quest was completed" do
        before do
          talent.update!(verified: true)
        end

        it_behaves_like "a refresh user quest that creates new records"
      end

      context "when the quest was not completed" do
        it_behaves_like "a refresh user quest without creating new records"
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
  end

  context "when the quest was already credited for the user" do
    before do
      create :user_v2_quest, v2_quest: quest, user: user
    end

    it_behaves_like "a refresh user quest without creating new records"
  end
end
