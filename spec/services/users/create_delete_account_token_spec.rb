require "rails_helper"

RSpec.describe Users::CreateDeleteAccountToken do
  include ActiveJob::TestHelper

  let(:user) { create :user }

  describe "#call" do
    subject(:create_delete_account_token) { described_class.new(user: user).call }

    before do
      allow(SecureRandom).to receive(:hex).and_return("token")
    end

    it "updates the user with a delete account token and expiry" do
      freeze_time do
        expect { create_delete_account_token }
          .to change { [user.delete_account_token, user.delete_account_token_expires_at] }
          .from([nil, nil])
          .to(["token", Time.now + 1.hour])
      end
    end

    it "enqueues a job to send a confirm account deletion email to the user" do
      expect { create_delete_account_token }
        .to have_enqueued_job
        .exactly(:once)
        .and have_enqueued_job(ActionMailer::MailDeliveryJob)

      expect(enqueued_jobs[0][:args]).to include("send_confirm_account_deletion_email")
    end

    it "returns a success result" do
      expect(create_delete_account_token).to eq({success: true})
    end

    context "when there is an issue updating the user" do
      before do
        allow(user).to receive(:update).and_return(false)
      end

      it "returns an unsuccess result" do
        expect(create_delete_account_token).to eq({success: false})
      end
    end
  end
end
