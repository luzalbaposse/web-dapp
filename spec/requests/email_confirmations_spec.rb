require "rails_helper"

RSpec.describe "EmailConfirmations", type: :request do
  include ActiveJob::TestHelper

  let!(:user) { create :user, email_confirmed_at: nil, email_confirmation_token: token }

  describe "#update" do
    let(:token) { "token" }

    let(:add_users_to_mailerlite_job_class) { AddUsersToMailerliteJob }
    let(:add_users_to_mailerlite_job_instance) { instance_double(add_users_to_mailerlite_job_class) }

    before do
      allow(add_users_to_mailerlite_job_class).to receive(:perform_later).and_return(add_users_to_mailerlite_job_instance)
    end

    it "confirms the user's email" do
      get confirm_email_path(token:)

      expect(user.reload.email_confirmed_at).not_to be_nil
    end

    it "enqueues a job to add user to Mailerlite" do
      get confirm_email_path(token:)

      expect(add_users_to_mailerlite_job_class).to have_received(:perform_later).with(user.id)
    end

    it "sends the welcome email" do
      Sidekiq::Testing.inline! do
        get confirm_email_path(token:)

        perform_enqueued_jobs

        expect(ActionMailer::Base.deliveries.last.subject).to include("Welcome to the home of talented builders")
      end
    end
  end
end
