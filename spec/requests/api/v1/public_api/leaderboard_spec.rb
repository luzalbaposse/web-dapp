require "swagger_helper"
require "rails_helper"

RSpec.describe "Leaderboards API" do
  path "/leaderboards" do
    get "Retrieves the invite leaderboards" do
      tags "Leaderboards"
      consumes "application/json"
      produces "application/json"
      parameter name: :id, in: :query, type: :string, description: "Race id"
      parameter name: :cursor, in: :query, type: :string, description: "The cursor to fetch the next page"
      parameter name: "X-API-KEY", in: :header, type: :string, description: "Your Talent Protocol API key"

      let!(:api_key_object) { create(:api_key, :activated, access_key: access_key) }
      let(:access_key) { SecureRandom.hex }
      let(:"X-API-KEY") { access_key }

      let!(:talent_user) { create(:user, :with_talent_token, wallet_id: wallet_id, display_name: "API user") }
      let(:wallet_id) { SecureRandom.hex }
      let(:race) { create :race }
      let(:id) { race.uuid }
      let(:cursor) { nil }

      let(:user_1) { create :user }
      let(:user_2) { create :user }
      let(:user_3) { create :user }
      let(:user_4) { create :user }

      before do
        create :leaderboard, user: user_1, race: race, score: 20
        create :leaderboard, user: user_2, race: race, score: 15
        create :leaderboard, user: user_3, race: race, score: 10
        create :leaderboard, user: user_4, race: race, score: 2
      end

      response "200", "race found", save_example: true do
        schema type: :object,
          properties: {
            leaderboards: {
              type: :array,
              items: {
                type: :object,
                properties: PublicAPI::ObjectProperties::LEADERBOARD_PROPERTIES
              }
            },
            pagination: {
              type: :object,
              properties: PublicAPI::ObjectProperties::PAGINATION_PROPERTIES
            }
          }

        run_test! do |response|
          data = JSON.parse(response.body)

          returned_leaderboards = data["leaderboards"]
          returned_usernames = returned_leaderboards.map { |f| f["user"]["username"] }
          returned_pagination = data["pagination"]
          aggregate_failures do
            expect(data["leaderboards"].count).to eq 4
            expect(returned_usernames).to eq([user_1.username, user_2.username, user_3.username, user_4.username])

            expect(returned_pagination["total"]).to eq 4
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
