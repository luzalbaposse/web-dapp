require "rails_helper"

RSpec.describe SubscriptionMailer, type: :mailer do
  let(:user) { create :user, legal_first_name: "Jonny" }

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

  describe "#subscription_request_email" do
    let(:mail) { described_class.with(recipient_id: user.id).subscription_request_email }

    let(:dynamic_template_data) do
      {
        first_name: user.name,
        pending_subscribe_requests: 0
      }
    end

    let(:template_id) { "d-cce7c115f2dd4e9dbf2898403ea2b6fb" }

    it_behaves_like "a SendGrid email"
  end

  describe "#subscription_accepted_email" do
    let(:subscribed) { create :user }
    let(:mail) { described_class.with(recipient: user, source_id: subscribed.id).subscription_accepted_email }

    let(:dynamic_template_data) do
      {
        first_name: user.name,
        subscribed_profile: user_url(username: subscribed.username),
        subscribed_username: subscribed.username
      }
    end

    let(:template_id) { "d-adfed86609d246679a69351e34e3fd9a" }

    it_behaves_like "a SendGrid email"
  end
end
