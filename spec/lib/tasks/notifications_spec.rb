require "rails_helper"
require "rake"

RSpec.describe "notifications:send_emails_to_admin" do
  include ActiveJob::TestHelper
  include_context "rake"

  let(:user) { create :user, role: }
  let(:role) { "admin" }

  it "sends all user emails to the admin" do
    Sidekiq::Testing.inline! do
      subject.invoke(user.id)

      perform_enqueued_jobs

      emails = ActionMailer::Base.deliveries

      aggregate_failures do
        expect(emails.count).to eq(14)

        expect(emails.map(&:subject)).to match_array(
          [
            "Confirm your email address",
            "Talent Protocol - Did you forget your password?",
            "Welcome to the home of talented builders",
            "No token, no supporters 🤔",
            "Congrats, your Talent Token is now live!",
            "You're missing out on $TAL rewards!",
            "Complete your profile and earn your NFT today! 🚀",
            "You can now apply to launch a Talent Token! 👏",
            "You're verified! ✅",
            "Verification failed 💔",
            "We've received your application",
            "Hey, you can now launch your token 🚀",
            "We have open roles for you!",
            "Looking to hire talent?"
          ]
        )
      end
    end
  end

  context "when the user is not an admin" do
    let(:role) { "basic" }

    it "raises an error" do
      expect { subject.invoke(user.id) }
        .to raise_error(RuntimeError, "Cannot find admin with id #{user.id}")
    end

    it "does not send user emails to the user" do
      Sidekiq::Testing.inline! do
        begin
          subject.invoke(user.id)
        rescue RuntimeError
        end

        perform_enqueued_jobs

        expect(ActionMailer::Base.deliveries.count).to be_zero
      end
    end
  end

  context "when the user does not exist" do
    it "raises an error" do
      expect { subject.invoke(-1) }
        .to raise_error(RuntimeError, "Cannot find admin with id -1")
    end

    it "does not send user emails" do
      Sidekiq::Testing.inline! do
        begin
          subject.invoke(-1)
        rescue RuntimeError
        end

        perform_enqueued_jobs

        expect(ActionMailer::Base.deliveries.count).to be_zero
      end
    end
  end
end
