require "rails_helper"
require "sendgrid/contacts/upsert"

RSpec.describe Sendgrid::Contacts::Upsert do
  let(:additional_list_ids) { nil }
  let(:user_ids) { nil }

  let!(:user_one) do
    create :user,
      email: "jessie@gmail.com",
      email_confirmed_at:,
      experience_points_amount: 500,
      legal_first_name: "Jessie",
      legal_last_name: "Lee",
      tags: [tag_one],
      tokens_purchased: true,
      username: "jessie",
      wallet_id: "298488f32bf0ef891071053167a444ef3"
  end

  let!(:user_two) do
    create :user,
      email: "jonny@gmail.com",
      email_confirmed_at:,
      experience_points_amount: 1000,
      legal_first_name: "Jonny",
      legal_last_name: "Smith",
      tags: [tag_one, tag_two],
      username: "jonny",
      wallet_id: "13861f32bf0ef891071053167a564ef3"
  end

  let!(:user_three) do
    create :user,
      email: "zara@gmail.com",
      email_confirmed_at: nil,
      experience_points_amount: 1500,
      legal_first_name: "Zara",
      username: "zara",
      wallet_id: "dsafds93292828ox0381203820123223"
  end

  let(:email_confirmed_at) { "2023-01-11T13:43:49.398Z".to_datetime }
  let(:tag_one) { create :tag, description: "foo" }
  let(:tag_two) { create :tag, description: "bar" }

  let(:sendgrid_api_class) { SendGrid::API }
  let(:sendgrid_api) { instance_double(sendgrid_api_class, client: sendgrid_client) }
  let(:sendgrid_client) { double(SendGrid::Client) }

  let(:sendgrid_contacts_response) do
    OpenStruct.new(
      body: {}.to_json,
      status_code: sendgrid_contacts_response_status_code
    )
  end

  let(:sendgrid_contacts_response_status_code) { "202" }

  let(:sendgrid_field_definitions_response) do
    OpenStruct.new(
      body: sendgrid_field_definitions_response_body.to_json,
      status_code: sendgrid_field_definitions_response_status_code
    )
  end

  let(:sendgrid_field_definitions_response_body) do
    {
      "custom_fields" => [
        {"id" => "e1_T", "name" => "Username", "field_type" => "Text", "_metadata" => {"self" => "https://api.sendgrid.com/v3/marketing/field_definitions/e1_T"}},
        {"id" => "e2_T", "name" => "WalletAddress", "field_type" => "Text", "_metadata" => {"self" => "https://api.sendgrid.com/v3/marketing/field_definitions/e2_T"}},
        {"id" => "e3_D", "name" => "Joined", "field_type" => "Date", "_metadata" => {"self" => "https://api.sendgrid.com/v3/marketing/field_definitions/e3_D"}},
        {"id" => "e4_D", "name" => "Last_login", "field_type" => "Date", "_metadata" => {"self" => "https://api.sendgrid.com/v3/marketing/field_definitions/e4_D"}},
        {"id" => "e5_N", "name" => "Active_goals", "field_type" => "Number", "_metadata" => {"self" => "https://api.sendgrid.com/v3/marketing/field_definitions/e5_N"}},
        {"id" => "e6_N", "name" => "Total_goals", "field_type" => "Number", "_metadata" => {"self" => "https://api.sendgrid.com/v3/marketing/field_definitions/e6_N"}},
        {"id" => "e7_N", "name" => "Total_updates", "field_type" => "Number", "_metadata" => {"self" => "https://api.sendgrid.com/v3/marketing/field_definitions/e7_N"}},
        {"id" => "e8_D", "name" => "Last_update", "field_type" => "Date", "_metadata" => {"self" => "https://api.sendgrid.com/v3/marketing/field_definitions/e8_D"}},
        {"id" => "e9_N", "name" => "TAL_balance", "field_type" => "Text", "_metadata" => {"self" => "https://api.sendgrid.com/v3/marketing/field_definitions/e9_N"}},
        {"id" => "e10_N", "name" => "XP", "field_type" => "Number", "_metadata" => {"self" => "https://api.sendgrid.com/v3/marketing/field_definitions/e10_N"}},
        {"id" => "e11_T", "name" => "Location", "field_type" => "Text", "_metadata" => {"self" => "https://api.sendgrid.com/v3/marketing/field_definitions/e11_T"}},
        {"id" => "e12_T", "name" => "Tags", "field_type" => "Text", "_metadata" => {"self" => "https://api.sendgrid.com/v3/marketing/field_definitions/e12_T"}},
        {"id" => "e13_N", "name" => "Subscribers", "field_type" => "Number", "_metadata" => {"self" => "https://api.sendgrid.com/v3/marketing/field_definitions/e13_N"}},
        {"id" => "e14_N", "name" => "Subscribing", "field_type" => "Number", "_metadata" => {"self" => "https://api.sendgrid.com/v3/marketing/field_definitions/e14_N"}},
        {"id" => "e15_N", "name" => "Friends_invited", "field_type" => "Number", "_metadata" => {"self" => "https://api.sendgrid.com/v3/marketing/field_definitions/e15_N"}}
      ]
    }
  end

  let(:sendgrid_field_definitions_response_status_code) { "200" }

  before do
    ENV["SENDGRID_MEMBERS_LIST_ID"] = "members_list_id"

    allow(sendgrid_api_class).to receive(:new).and_return(sendgrid_api)

    allow(sendgrid_client)
      .to receive_message_chain(:marketing, :contacts, :put)
      .and_return(sendgrid_contacts_response)

    allow(sendgrid_client)
      .to receive_message_chain(:marketing, :field_definitions, :get)
      .and_return(sendgrid_field_definitions_response)
  end

  subject { described_class.new(additional_list_ids:, user_ids:) }

  describe "#call" do
    it "makes a request to fetch custom fields" do
      expect(sendgrid_client).to receive_message_chain(:marketing, :field_definitions, :get)

      subject.call
    end

    it "makes a request to upsert all confirmed users as contacts to SendGrid" do
      expect(sendgrid_client)
        .to receive_message_chain(:marketing, :contacts, :put)
        .with(
          request_body: {
            contacts: [
              {
                custom_fields: {
                  "e1_T" => "jessie",
                  "e2_T" => "298488f32bf0ef891071053167a444ef3",
                  "e3_D" => email_confirmed_at,
                  "e5_N" => 0,
                  "e6_N" => 0,
                  "e7_N" => 0,
                  "e9_N" => "true",
                  "e10_N" => 500,
                  "e12_T" => "foo",
                  "e13_N" => 0,
                  "e14_N" => 0,
                  "e15_N" => 0
                },
                email: "jessie@gmail.com",
                first_name: "Jessie",
                last_name: "Lee"
              },
              {
                custom_fields: {
                  "e1_T" => "jonny",
                  "e2_T" => "13861f32bf0ef891071053167a564ef3",
                  "e3_D" => email_confirmed_at,
                  "e5_N" => 0,
                  "e6_N" => 0,
                  "e7_N" => 0,
                  "e9_N" => "false",
                  "e10_N" => 1000,
                  "e12_T" => "foo, bar",
                  "e13_N" => 0,
                  "e14_N" => 0,
                  "e15_N" => 0
                },
                email: "jonny@gmail.com",
                first_name: "Jonny",
                last_name: "Smith"
              }
            ],
            list_ids: ["members_list_id"]
          }
        )

      subject.call
    end

    context "when there are additional list ids" do
      let(:additional_list_ids) { ["test"] }

      it "makes a request to upsert all confirmed users as contacts to SendGrid with the additional list ids" do
        expect(sendgrid_client)
          .to receive_message_chain(:marketing, :contacts, :put)
          .with(
            request_body: {
              contacts: [
                {
                  custom_fields: {
                    "e1_T" => "jessie",
                    "e2_T" => "298488f32bf0ef891071053167a444ef3",
                    "e3_D" => email_confirmed_at,
                    "e5_N" => 0,
                    "e6_N" => 0,
                    "e7_N" => 0,
                    "e9_N" => "true",
                    "e10_N" => 500,
                    "e12_T" => "foo",
                    "e13_N" => 0,
                    "e14_N" => 0,
                    "e15_N" => 0
                  },
                  email: "jessie@gmail.com",
                  first_name: "Jessie",
                  last_name: "Lee"
                },
                {
                  custom_fields: {
                    "e1_T" => "jonny",
                    "e2_T" => "13861f32bf0ef891071053167a564ef3",
                    "e3_D" => email_confirmed_at,
                    "e5_N" => 0,
                    "e6_N" => 0,
                    "e7_N" => 0,
                    "e9_N" => "false",
                    "e10_N" => 1000,
                    "e12_T" => "foo, bar",
                    "e13_N" => 0,
                    "e14_N" => 0,
                    "e15_N" => 0
                  },
                  email: "jonny@gmail.com",
                  first_name: "Jonny",
                  last_name: "Smith"
                }
              ],
              list_ids: ["members_list_id", "test"]
            }
          )

        subject.call
      end
    end

    context "when there are user ids" do
      let(:user_ids) { [user_two.id] }

      it "makes a request to upsert the user as a contact to SendGrid" do
        expect(sendgrid_client)
          .to receive_message_chain(:marketing, :contacts, :put)
          .with(
            request_body: {
              contacts: [
                {
                  custom_fields: {
                    "e1_T" => "jonny",
                    "e2_T" => "13861f32bf0ef891071053167a564ef3",
                    "e3_D" => email_confirmed_at,
                    "e5_N" => 0,
                    "e6_N" => 0,
                    "e7_N" => 0,
                    "e9_N" => "false",
                    "e10_N" => 1000,
                    "e12_T" => "foo, bar",
                    "e13_N" => 0,
                    "e14_N" => 0,
                    "e15_N" => 0
                  },
                  email: "jonny@gmail.com",
                  first_name: "Jonny",
                  last_name: "Smith"
                }
              ],
              list_ids: ["members_list_id"]
            }
          )

        subject.call
      end
    end

    context "when there are no confirmed users" do
      let(:email_confirmed_at) { nil }

      it "does not make a request to upsert contacts to SendGrid" do
        expect(sendgrid_client).not_to have_received(:marketing)

        subject.call
      end
    end

    context "when the response status code is not 200 when fetching custom fields" do
      let(:sendgrid_field_definitions_response_body) do
        {
          errors: [
            {
              field: nil,
              message: "unauthorized"
            }
          ]
        }
      end

      let(:sendgrid_field_definitions_response_status_code) { "400" }

      it "raises a BadResponse error" do
        expect { subject.call }.to raise_error(Sendgrid::Contacts::Upsert::BadResponse)
      end
    end

    context "when the response status code is not 202 when upserting contacts" do
      let(:sendgrid_contacts_response_body) do
        {
          errors: [
            {
              field: nil,
              message: "unauthorized"
            }
          ]
        }
      end

      let(:sendgrid_contacts_response_status_code) { "400" }

      it "raises a BadResponse error" do
        expect { subject.call }.to raise_error(Sendgrid::Contacts::Upsert::BadResponse)
      end
    end
  end
end
