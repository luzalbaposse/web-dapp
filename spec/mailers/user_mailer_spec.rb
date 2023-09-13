require "rails_helper"

RSpec.describe UserMailer, type: :mailer do
  let(:user) { create :user }

  let(:sendgrid_api_class) { SendGrid::API }
  let(:sendgrid_api) { instance_double(sendgrid_api_class, client: sendgrid_client) }
  let(:sendgrid_client) { double(SendGrid::Client) }

  let(:sendgrid_response) do
    OpenStruct.new(body: {}.to_json, status_code: sendgrid_response_status_code)
  end

  let(:sendgrid_response_status_code) { "202" }

  let(:sendgrid_from) do
    {
      email: "no-reply@talentprotocol.com",
      name: "Filipe at Talent Protocol"
    }
  end

  let(:sendgrid_mail_settings) { {sandbox_mode: {enable: true}} }
  let(:sendgrid_personalizations) { [{to: [{email: user.email}]}] }

  before do
    ENV["EMAILS_FROM"] = "Filipe at Talent Protocol"

    allow(sendgrid_api_class).to receive(:new).and_return(sendgrid_api)
    allow(sendgrid_client).to receive_message_chain(:mail, :_, :post).and_return(sendgrid_response)
  end

  describe "sign up email" do
    let(:mail) { described_class.with(user_id: user.id).send_sign_up_email }

    let(:dynamic_template_data) do
      {
        confirm_email: confirm_email_url(token: user.email_confirmation_token),
        first_name: user.username
      }
    end

    let(:template_id) { "d-0e31e2fe5a76467e8973cf16484bf15a" }

    it_behaves_like "a SendGrid email"
  end

  describe "password reset email" do
    let(:mail) { described_class.with(user: user).send_password_reset_email }

    let(:dynamic_template_data) do
      {
        first_name: user.username,
        reset_password: url_for(
          action: "reset_password",
          controller: "onboard",
          token: user.confirmation_token,
          user_id: user.uuid
        )
      }
    end

    let(:template_id) { "d-e90e5023339d4ad69e74c272c0761000" }

    it_behaves_like "a SendGrid email"
  end

  describe "send verified profile email" do
    let(:mail) { described_class.with(source_id: user.id).send_verified_profile_email }

    let(:dynamic_template_data) { {first_name: user.username} }
    let(:template_id) { "d-1cc5d11d6b5b40e2b6437e900c392722" }

    it_behaves_like "a SendGrid email"
  end

  describe "send verification failed profile email" do
    let(:mail) { described_class.with(source_id: user.id, reason: "name").send_verification_failed_email }

    let(:dynamic_template_data) { {first_name: user.username} }
    let(:template_id) { "d-4872e699a01d40ffaa04d7d894bb836c" }

    it_behaves_like "a SendGrid email"
  end

  describe "send message received email" do
    let(:notification) { create :notification, type: "MessageReceivedNotification", recipient: user }
    let(:sender) { create :user, username: "alicesmith" }

    let(:mail) do
      described_class
        .with(recipient: user, sender_id: sender.id, record: notification)
        .send_message_received_email
    end

    let(:dynamic_template_data) do
      {
        DM_sender_username: sender.username,
        first_name: user.username,
        link_message: messages_url(user: sender.username)
      }
    end

    let(:template_id) { "d-aad307f9267342a49724a0cd1834de98" }

    before do
      allow(user).to receive(:has_unread_messages?).and_return(true)
    end

    it_behaves_like "a SendGrid email"
  end

  describe "send confirm account deletion email" do
    let(:token) { "token" }
    let(:mail) { described_class.with(token:, user:).send_confirm_account_deletion_email }

    let(:dynamic_template_data) do
      {
        delete_account: delete_account_url(token:, username: user.username),
        first_name: user.username
      }
    end

    let(:template_id) { "d-421a265369d447ff899fcdcb5b5c3de8" }

    it_behaves_like "a SendGrid email"
  end

  describe "send goal deadline reminder email" do
    let(:mail) do
      described_class.with(goal: goal, user: user).send_goal_deadline_reminder_email
    end

    let(:goal) { create :goal, due_date: Date.current }

    let(:dynamic_template_data) do
      {
        edit_goal: user_url(username: user.username, tab: "goals"),
        first_name: user.username,
        goal_title: goal.title,
        tab_updates: user_url(username: user.username, tab: "updates")
      }
    end

    let(:template_id) { "d-a74bb51a5dc549eaa8d9a677a67cfe56" }

    it_behaves_like "a SendGrid email"
  end

  describe "send goal due in one month reminder email" do
    let(:mail) do
      described_class.with(goal: goal, user: user).send_goal_due_in_one_month_reminder_email
    end

    let(:goal) { create :goal, due_date: 30.days.after }

    let(:dynamic_template_data) do
      {
        edit_goal: user_url(username: user.username, tab: "goals"),
        first_name: user.username,
        goal_title: goal.title,
        tab_updates: user_url(username: user.username, tab: "updates")
      }
    end

    let(:template_id) { "d-d00675dee35c4a8dbcdcb4395d9e803c" }

    it_behaves_like "a SendGrid email"
  end

  describe "send career update created email" do
    let(:career_update) { create :career_update, text: "New job!", user: sender }
    let(:sender) { create :user }

    let(:mail) do
      described_class
        .with(career_update_id: career_update.id, recipient: user, source_id: sender.id)
        .send_career_update_created_email
    end

    let(:dynamic_template_data) do
      {
        career_update: career_update.text,
        first_name: user.username,
        link_send_DM: messages_url(user: sender.username),
        update_sender_username: sender.username
      }
    end

    let(:template_id) { "d-a031432f14d344f09a1536a4ecdf851f" }

    it_behaves_like "a SendGrid email"
  end
end
