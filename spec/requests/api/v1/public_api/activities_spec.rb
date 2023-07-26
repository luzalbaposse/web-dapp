require "swagger_helper"
require "rails_helper"

RSpec.describe "Activities API", type: :request do
  before do
    stub_const("API::V1::PublicAPI::APIController::INTERNAL_DOMAINS", ["talentprotocol.com"])
    host! "app.talentprotocol.com"
  end

  path "/activities" do
    get "Retrieves activities from user\"s feed" do
      tags "Activities"
      consumes "application/json"
      produces "application/json"
      parameter name: :cursor, in: :query, type: :string, description: "The cursor to fetch the next page"
      parameter name: :organization, in: :query, type: :string, description: "The slug of the organization to retrieve member activities for"
      parameter name: :"types[]", in: :query, type: :array, collectionFormat: :multi, description: "The types of activities to retrieve"
      parameter name: "X-API-KEY", in: :header, type: :string, description: "Your Talent Protocol API key"

      let!(:api_key_object) { create(:api_key, :activated, access_key:) }
      let(:access_key) { SecureRandom.hex }
      let(:"X-API-KEY") { access_key }
      let(:cursor) { nil }
      let(:organization) { nil }
      let(:"types[]") { [] }

      let!(:user_one) { create :user, :with_talent_token, display_name: "API user 1" }
      let!(:user_two) { create :user, :with_talent_token, display_name: "API user 2" }

      before do
        allow_any_instance_of(API::V1::PublicAPI::APIController).to receive(:current_user).and_return(user_one)

        career_updates = ["first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth"]
        activity_feed = user_one.activity_feed

        activity = create :activity, content: {message: career_updates.first}.to_json, origin_user: user_one, type: "Activities::Subscribe"
        activity_feed.activities << activity

        career_updates.drop(1).each do |message|
          activity = create :activity, content: {message:}.to_json, origin_user: user_one, type: "Activities::CareerUpdate"
          activity_feed.activities << activity
        end

        create :activity, content: {message: "tenth"}.to_json, global: true, origin_user: user_two, type: "Activities::CareerUpdate"

        create :community, slug: "test-org", users: [user_two]
      end

      response "200", "Activities retrieved", document: false do
        schema type: :object,
          properties: {
            activities: {
              type: :array,
              items: {
                type: :object,
                properties: PublicAPI::ObjectProperties::ACTIVITY_PROPERTIES
              }
            },
            pagination: {
              type: :object,
              properties: PublicAPI::ObjectProperties::PAGINATION_PROPERTIES
            }
          }

        run_test! do |response|
          data = JSON.parse(response.body)

          aggregate_failures do
            expect(data["activities"].map { |f| f["type"] }.uniq)
              .to match_array(["Activities::CareerUpdate", "Activities::Subscribe"])

            expect(data["pagination"]["total"]).to eq(10)
          end
        end
      end

      response "200", "Only activities of a certain type retrieved", document: false do
        let(:"types[]") { ["Activities::Subscribe"] }

        schema type: :object,
          properties: {
            activities: {
              type: :array,
              items: {
                type: :object,
                properties: PublicAPI::ObjectProperties::ACTIVITY_PROPERTIES
              }
            },
            pagination: {
              type: :object,
              properties: PublicAPI::ObjectProperties::PAGINATION_PROPERTIES
            }
          }

        run_test! do |response|
          data = JSON.parse(response.body)

          aggregate_failures do
            expect(data["activities"].map { |f| f["type"] }.uniq).to eq(["Activities::Subscribe"])
            expect(data["pagination"]["total"]).to eq(1)
          end
        end
      end

      response "200", "Activities retrieved filtered by organization", document: false do
        let(:organization) { "test-org" }

        schema type: :object,
          properties: {
            activities: {
              type: :array,
              items: {
                type: :object,
                properties: PublicAPI::ObjectProperties::ACTIVITY_PROPERTIES
              }
            },
            pagination: {
              type: :object,
              properties: PublicAPI::ObjectProperties::PAGINATION_PROPERTIES
            }
          }

        run_test! do |response|
          data = JSON.parse(response.body)

          aggregate_failures do
            expect(data["activities"].map { |f| f["type"] }.uniq).to eq(["Activities::CareerUpdate"])
            expect(data["pagination"]["total"]).to eq(1)
          end
        end
      end

      response "401", "unauthorized request", document: false do
        let(:"X-API-KEY") { "invalid" }

        run_test!
      end
    end
  end
end
