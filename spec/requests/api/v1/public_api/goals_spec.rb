require "swagger_helper"
require "rails_helper"

RSpec.describe "Goals API" do
  let!(:api_key_object) { create(:api_key, :activated, access_key: access_key) }
  let(:access_key) { SecureRandom.hex }
  let(:"X-API-KEY") { access_key }

  path "/goals" do
    get "Retrieves a list of goals" do
      tags "Goals"
      consumes "application/json"
      produces "application/json"
      parameter name: :id, in: :query, type: :string, description: "Wallet address or username"
      parameter name: :cursor, in: :query, type: :string, description: "The cursor to fetch the next page"
      parameter name: "X-API-KEY", in: :header, type: :string, description: "Your Talent Protocol API key"

      let(:cursor) { nil }
      let(:id) { nil }

      let(:user) { create :user }
      let!(:talent) { create :talent, user: user }
      let(:career_goal) { create(:career_goal, talent: talent) }
      let!(:goal1) { create(:goal, career_goal: career_goal, title: "goal1", due_date: Time.zone.today) }
      let!(:goal2) { create(:goal, career_goal: career_goal, title: "goal2", due_date: Time.zone.today) }

      response "200", "get all user goals", document: false do
        let(:id) { user.username }

        schema type: :object,
          properties: {
            goals: {
              type: :array,
              items: {
                type: :object,
                properties: PublicAPI::ObjectProperties::GOAL_PROPERTIES
              }
            },
            pagination: {
              type: :object,
              properties: PublicAPI::ObjectProperties::PAGINATION_PROPERTIES
            }
          }

        run_test! do |response|
          data = JSON.parse(response.body)

          returned_goals = data["goals"]
          returned_titles = returned_goals.map { |f| f["title"] }
          returned_pagination = data["pagination"]
          aggregate_failures do
            expect(returned_goals.count).to eq 2
            expect(returned_titles).to match_array([goal1.title, goal2.title])

            expect(returned_pagination["total"]).to eq 2
          end
        end
      end

      response "404", "talent not found" do
        let(:id) { "invalid" }
        run_test!
      end

      response "401", "unauthorized request" do
        let(:"X-API-KEY") { "invalid" }
        run_test!
      end
    end
  end
end
