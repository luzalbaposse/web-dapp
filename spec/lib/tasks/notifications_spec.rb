require "rails_helper"
require "rake"

RSpec.describe "notifications:send_emails_to_admin" do
  include ActiveJob::TestHelper
  include_context "rake"

  let(:user) { create :user, role: }
  let(:role) { "admin" }

  it "sends all user emails to the admin" do
    expect { subject.invoke(user.id) }
      .to have_enqueued_job(ActionMailer::MailDeliveryJob)
      .exactly(11)
      .times

    expect(enqueued_jobs.map { |job| job[:args][1] })
      .to match_array(
        %w[
          send_sign_up_email
          send_password_reset_email
          send_verified_profile_email
          send_verification_failed_email
          send_confirm_account_deletion_email
          send_goal_deadline_reminder_email
          send_goal_due_in_one_month_reminder_email
          send_career_update_created_email
          subscription_request_email
          subscription_accepted_email
          new_sponsor_email
        ]
      )
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
