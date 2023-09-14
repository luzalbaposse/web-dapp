require "rails_helper"

RSpec.describe SponsorshipMailer, type: :mailer do
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

  describe "#new_sponsor_email" do
    let(:sponsor) { create :user }
    let(:mail) { described_class.with(recipient: user, source_id: sponsor.id).new_sponsor_email }

    let(:template_id) { "d-5b54752273534b819f73ffdf79b172e1" }

    let(:dynamic_template_data) do
      {
        first_name: user.name,
        sponsor_request_username: sponsor.username
      }
    end

    it_behaves_like "a SendGrid email"
  end
end
