require "rails_helper"

RSpec.describe EmailReminders::SendSubscriptionRequestEmailJob, type: :job do
  include ActiveJob::TestHelper

  let!(:user_1) { create :user }
  let!(:user_2) { create :user, talent: talent }
  let(:talent) { create :talent }

  describe "#perform" do
    it "enqueues a job to send an email notification to users with pending subscriptions" do
      create :subscription, user: user_1, subscriber: user_2, accepted_at: nil

      expect { described_class.perform_now }
        .to have_enqueued_job
        .exactly(:once)
        .and have_enqueued_job(ActionMailer::MailDeliveryJob)

      expect(enqueued_jobs[0][:args]).to include("subscription_request_email")
    end

    context "when the subscription was created more than 25 hours ago" do
      it "does not enqueue a job to send an email notification to users with pending subscriptions" do
        subscription = create :subscription, user: user_1, subscriber: user_2
        subscription.update!(created_at: 26.hours.ago)

        expect { described_class.perform_now }.not_to have_enqueued_job
      end
    end
  end
end
