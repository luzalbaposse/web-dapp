require "rails_helper"
require "sendgrid/contacts/delete"

RSpec.describe Sendgrid::Contacts::Delete do
  let(:emails) { ["jessie@gmail.com", "jonny@gmail.com"] }

  let(:sendgrid_api_class) { SendGrid::API }
  let(:sendgrid_api) { instance_double(sendgrid_api_class, client: sendgrid_client) }
  let(:sendgrid_client) { double(SendGrid::Client) }

  let(:sendgrid_contacts_delete_response) do
    OpenStruct.new(
      body: sendgrid_contacts_delete_response_body.to_json,
      status_code: sendgrid_contacts_delete_response_status_code
    )
  end

  let(:sendgrid_contacts_delete_response_body) { {} }
  let(:sendgrid_contacts_delete_response_status_code) { "202" }

  let(:sendgrid_contacts_search_response) do
    OpenStruct.new(
      body: sendgrid_contacts_search_response_body.to_json,
      status_code: sendgrid_contacts_search_response_status_code
    )
  end

  let(:sendgrid_contacts_search_response_body) do
    {
      "result" => {
        "jessie@gmail.com" => {
          "contact" => {
            "id" => "987zyx"
          }
        },
        "jonny@gmail.com" => {
          "contact" => {
            "id" => "123abc"
          }
        }
      }
    }
  end

  let(:sendgrid_contacts_search_response_status_code) { "200" }

  before do
    allow(sendgrid_api_class).to receive(:new).and_return(sendgrid_api)

    allow(sendgrid_client)
      .to receive_message_chain(:marketing, :contacts)
      .and_return(sendgrid_client)

    allow(sendgrid_client)
      .to receive(:delete)
      .and_return(sendgrid_contacts_delete_response)

    allow(sendgrid_client)
      .to receive_message_chain(:search, :emails, :post)
      .and_return(sendgrid_contacts_search_response)
  end

  subject { described_class.new(emails:) }

  describe "#call" do
    it "makes a request to fetch the id of the contacts" do
      expect(sendgrid_client)
        .to receive_message_chain(:marketing, :contacts, :search, :emails, :post)
        .with(request_body: {emails:})

      subject.call
    end

    it "makes a request to delete the contacts from SendGrid" do
      expect(sendgrid_client)
        .to receive_message_chain(:marketing, :contacts, :delete)
        .with(query_params: {ids: "987zyx, 123abc"})

      subject.call
    end

    context "when the response status code is 404 when fetching contact ids" do
      let(:sendgrid_contacts_search_response_status_code) { "404" }

      it "does not make a request to delete contacts from SendGrid" do
        expect(sendgrid_client).not_to receive(:delete)

        subject.call
      end
    end

    context "when the response status code is not 202 when deleting contacts" do
      let(:sendgrid_contacts_delete_response_body) do
        {
          errors: [
            {
              field: nil,
              message: "unauthorized"
            }
          ]
        }
      end

      let(:sendgrid_contacts_delete_response_status_code) { "400" }

      it "raises a BadResponse error" do
        expect { subject.call }.to raise_error(Sendgrid::Contacts::Delete::BadResponse)
      end
    end
  end
end
