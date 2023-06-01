require "swagger_helper"
require "rails_helper"

RSpec.describe "Quests API" do
  path "/quests" do
    get "Retrieves the quests" do
      tags "Quests"
      consumes "application/json"
      produces "application/json"
      parameter name: :id, in: :query, type: :string, description: "Wallet address or username"
      parameter name: :cursor, in: :query, type: :string, description: "The cursor to fetch the next page"
      parameter name: "X-API-KEY", in: :header, type: :string, description: "Your Talent Protocol API key"

      let!(:api_key_object) { create(:api_key, :activated, access_key: access_key) }
      let(:access_key) { SecureRandom.hex }
      let(:"X-API-KEY") { access_key }

      let!(:talent_user) { create(:user, :with_talent_token, wallet_id: wallet_id, display_name: "API user") }
      let(:wallet_id) { SecureRandom.hex }
      let(:id) { wallet_id }
      let(:cursor) { nil }

      before do
        create :quest, quest_type: "profile_picture", experience_points_amount: 10
        create :quest, quest_type: "three_journey_entries", experience_points_amount: 20
        career_update_quest = create :quest, quest_type: "send_career_update", experience_points_amount: 30

        create :user_quest, user: talent_user, quest: career_update_quest, completed_at: Time.new(2023, 10, 11)
      end

      response "200", "with a talent", save_example: true do
        schema type: :object,
          properties: {
            quests: {
              type: :array,
              items: {
                type: :object,
                properties: PublicAPI::ObjectProperties::QUEST_PROPERTIES
              }
            },
            pagination: {
              type: :object,
              properties: PublicAPI::ObjectProperties::PAGINATION_PROPERTIES
            }
          }

        run_test! do |response|
          data = JSON.parse(response.body)

          returned_quests = data["quests"]
          returned_points = returned_quests.map { |f| f["experience_points_amount"] }
          returned_completed_at = returned_quests.map { |f| f["completed_at"] }
          returned_pagination = data["pagination"]
          aggregate_failures do
            expect(data["quests"].count).to eq 3
            expect(returned_points).to match_array([10, 20, 30])
            expect(returned_completed_at).to match_array([nil, nil, Time.new(2023, 10, 11)])

            expect(returned_pagination["total"]).to eq 3
          end
        end
      end

      response "200", "without a talent", save_example: true do
        let(:id) { nil }

        schema type: :object,
          properties: {
            quests: {
              type: :array,
              items: {
                type: :object,
                properties: PublicAPI::ObjectProperties::QUEST_PROPERTIES
              }
            },
            pagination: {
              type: :object,
              properties: PublicAPI::ObjectProperties::PAGINATION_PROPERTIES
            }
          }

        run_test! do |response|
          data = JSON.parse(response.body)

          returned_quests = data["quests"]
          returned_points = returned_quests.map { |f| f["experience_points_amount"] }
          returned_completed_at = returned_quests.map { |f| f["completed_at"] }
          returned_pagination = data["pagination"]
          aggregate_failures do
            expect(data["quests"].count).to eq 3
            expect(returned_points).to match_array([10, 20, 30])
            expect(returned_completed_at).to match_array([nil, nil, nil])

            expect(returned_pagination["total"]).to eq 3
          end
        end
      end

      response "401", "unauthorized request" do
        let(:"X-API-KEY") { "invalid" }
        run_test!
      end
    end
  end
end
