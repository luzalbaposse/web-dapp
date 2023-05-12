require "swagger_helper"
require "rails_helper"

RSpec.describe "API::V1::PublicAPI::Activity", type: :request do
  path "/activity" do
    get "Retrieves activities from user\"s feed" do
      tags "Activities"
      consumes "application/json"
      produces "application/json"
      parameter name: :page, in: :query, type: :integer
      parameter name: "X-API-KEY", in: :header, type: :string, description: "Your Talent Protocol API key"

      let!(:api_key_object) { create(:api_key, :activated, access_key: access_key) }
      let(:access_key) { SecureRandom.hex }
      let(:"X-API-KEY") { access_key }
      let(:page) { 1 }

      let!(:user) { create(:user, display_name: "API user") }

      response "200", "Activities retrieved", save_example: true do
        schema type: :object,
          properties: {
            activities: {type: :array},
            pagination: {
              type: :object,
              properties: {
                currentPage: {type: :integer},
                lastPage: {type: :integer}
              }
            }
          }

        before do
          career_updates = ["first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth"]

          career_updates.each do |cu|
            ac = Activities::CareerUpdate.create!(message: cu, origin_user_id: user.id)

            user.activity_feed.activities << ac
          end

          allow_any_instance_of(API::V1::PublicAPI::APIController).to receive(:current_user).and_return(user)
        end

        run_test! do |response|
          data = JSON.parse(response.body)

          returned_activities = data["activities"]
          returned_types = returned_activities.map { |f| f["type"] }
          returned_pagination = data["pagination"]
          aggregate_failures do
            expect(returned_activities.length).to eq API::V1::PublicAPI::ActivityController::PER_PAGE
            expect(returned_types.uniq).to eq(["Activities::CareerUpdate"])

            expect(returned_pagination["total"]).to eq 9
          end
        end
      end
    end
  end
end
