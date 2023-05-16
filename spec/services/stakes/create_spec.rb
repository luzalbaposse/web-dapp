require "rails_helper"

RSpec.describe Stakes::Create do
  include ActiveJob::TestHelper

  subject(:create_stake) { described_class.new(amount:, talent_token:, staking_user:).call }

  let(:amount) { "1000" }
  let(:talent_token) { create :talent_token }
  let(:talent_owner) { create :user }
  let(:staking_user) { create :user }

  let(:create_notification_class) { CreateNotification }
  let(:create_notification_instance) { instance_double(create_notification_class, call: true) }

  before do
    talent_token.talent.update(user: talent_owner)
    allow(create_notification_class).to receive(:new).and_return(create_notification_instance)
  end

  context "when the user is buying tokens for the first time" do
    let(:staking_user) { create :user, tokens_purchased: false }

    it "sets the purchased tokens flag to true" do
      expect { create_stake }.to change(staking_user, :tokens_purchased).from(false).to(true)
    end

    it "enqueues the job to refresh supporters" do
      Sidekiq::Testing.inline! do
        create_stake

        job = enqueued_jobs.find { |j| j["job_class"] == "AddUsersToMailerliteJob" }

        aggregate_failures do
          expect(job["job_class"]).to eq("AddUsersToMailerliteJob")
          expect(job["arguments"][0]).to eq(staking_user.id)
        end
      end
    end

    it "enqueues the job to send the member NFT" do
      Sidekiq::Testing.inline! do
        create_stake

        job = enqueued_jobs.find { |j| j["job_class"] == "WhitelistUserJob" }

        aggregate_failures do
          expect(job["job_class"]).to eq("WhitelistUserJob")
          expect(job["arguments"][0]["user_id"]).to eq(staking_user.id)
        end
      end
    end

    it "enqueues the job to update the user tasks" do
      Sidekiq::Testing.inline! do
        create_stake

        job = enqueued_jobs.find { |j| j["job_class"] == "UpdateTasksJob" }

        aggregate_failures do
          expect(job["job_class"]).to eq("UpdateTasksJob")
          expect(job["arguments"][0]["type"]).to eq("Tasks::BuyTalentToken")
          expect(job["arguments"][0]["user_id"]).to eq(staking_user.id)
        end
      end
    end

    it "enqueues the job to create the activity" do
      Sidekiq::Testing.inline! do
        create_stake

        job = enqueued_jobs.find { |j| j["job_class"] == "ActivityIngestJob" }

        aggregate_failures do
          expect(job["job_class"]).to eq("ActivityIngestJob")
          expect(job["arguments"][0]).to eq("stake")
        end
      end
    end
  end

  context "when the user is buying a talent token from another user" do
    it "initializes and calls the notification service" do
      create_stake

      aggregate_failures do
        expect(create_notification_class).to have_received(:new)

        expect(create_notification_instance).to have_received(:call).with(
          extra_params: {amount:},
          recipient: talent_token.talent.user,
          source_id: staking_user.id,
          type: TokenAcquiredNotification
        )
      end
    end

    context "when the user is buying the talent token for a second time" do
      before do
        create :talent_supporter, talent_contract_id: talent_token.contract_id, supporter_wallet_id: staking_user.wallet_id
      end

      it "initializes and calls the notification service with extra params" do
        create_stake

        aggregate_failures do
          expect(create_notification_class).to have_received(:new)
          expect(create_notification_instance).to have_received(:call).with(
            recipient: talent_token.talent.user,
            type: TokenAcquiredNotification,
            source_id: staking_user.id,
            extra_params: {amount:, reinvestment: true}
          )
        end
      end
    end
  end

  context "when the user is buying his own token" do
    let(:talent_token) { create :talent_token, talent: talent }
    let(:talent) { create :talent, user: staking_user }
    let(:staking_user) { create :user }

    it "does not call the notification service" do
      create_stake

      expect(create_notification_class).not_to have_received(:new)
    end

    it "enqueues the job to refresh supporters" do
      Sidekiq::Testing.inline! do
        create_stake

        job = enqueued_jobs.find { |j| j["job_class"] == "TalentSupportersRefreshJob" }

        aggregate_failures do
          expect(job["job_class"]).to eq("TalentSupportersRefreshJob")
          expect(job["arguments"][0]).to eq(talent_token.contract_id)
        end
      end
    end

    context "when the user already bought tokens" do
      let(:staking_user) { create :user, tokens_purchased: true }

      it "only triggers the job to refresh the supporters" do
        Sidekiq::Testing.inline! do
          create_stake

          aggregate_failures do
            expect(enqueued_jobs.count).to eq 2
            expect(enqueued_jobs.pluck("job_class")).to match_array(["TalentSupportersRefreshJob", "ActivityIngestJob"])
          end
        end
      end
    end
  end
end
