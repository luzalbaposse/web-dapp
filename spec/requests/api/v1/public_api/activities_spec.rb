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
      parameter name: :type, in: :query, type: :string, description: "The type of activity to retrieve"
      parameter name: "X-API-KEY", in: :header, type: :string, description: "Your Talent Protocol API key"

      let!(:api_key_object) { create(:api_key, :activated, access_key: access_key) }
      let(:access_key) { SecureRandom.hex }
      let(:"X-API-KEY") { access_key }
      let(:cursor) { nil }
      let(:type) { nil }

      let!(:user) { create(:user, :with_talent_token, display_name: "API user") }

      before do
        allow_any_instance_of(API::V1::PublicAPI::APIController).to receive(:current_user).and_return(user)

        career_updates = ["first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth"]
        activity_feed = user.activity_feed

        activity = create :activity, content: {message: career_updates.first}.to_json, origin_user: user, type: "Activities::MilestoneCreate"
        activity_feed.activities << activity

        career_updates.drop(1).each do |message|
          activity = create :activity, content: {message: message}.to_json, origin_user: user, type: "Activities::CareerUpdate"
          activity_feed.activities << activity
        end
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

          returned_activities = data["activities"]
          returned_types = returned_activities.map { |f| f["type"] }
          returned_pagination = data["pagination"]
          aggregate_failures do
            expect(returned_types.uniq).to match_array(["Activities::CareerUpdate", "Activities::MilestoneCreate"])

            expect(returned_pagination["total"]).to eq 9
          end
        end
      end

      response "200", "Only activities of a certain type retrieved", document: false do
        let(:type) { "Activities::MilestoneCreate" }

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

          returned_activities = data["activities"]
          returned_types = returned_activities.map { |f| f["type"] }
          returned_pagination = data["pagination"]
          aggregate_failures do
            expect(returned_types.uniq).to eq(["Activities::MilestoneCreate"])

            expect(returned_pagination["total"]).to eq 1
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
