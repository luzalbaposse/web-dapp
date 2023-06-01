require "swagger_helper"
require "rails_helper"

RSpec.describe "Experience Points Leaderboards API" do
  path "/experience_points_leaderboards" do
    get "Retrieves the experience points leaderboards" do
      tags "Leaderboards"
      consumes "application/json"
      produces "application/json"
      parameter name: :id, in: :query, type: :string, description: "The wallet address or username of the user to get the results from"
      parameter name: :start_date, in: :query, type: :string, description: "The initial date to count credited experience points"
      parameter name: :end_date, in: :query, type: :string, description: "The final date to count credited experience points"
      parameter name: :cursor, in: :query, type: :string, description: "The cursor to fetch the next page"
      parameter name: "X-API-KEY", in: :header, type: :string, description: "Your Talent Protocol API key"

      let!(:api_key_object) { create(:api_key, :activated, access_key: access_key) }
      let(:access_key) { SecureRandom.hex }
      let(:"X-API-KEY") { access_key }

      let!(:talent_user) { create(:user, :with_talent_token, wallet_id: wallet_id, display_name: "API user", role: "basic") }
      let(:wallet_id) { SecureRandom.hex }
      let(:id) { wallet_id }
      let(:cursor) { nil }
      let(:start_date) { Date.current - 20.days }
      let(:end_date) { Date.current + 10.days }

      let(:user_1) { create :user, role: "basic" }
      let(:user_2) { create :user, role: "basic" }
      let(:user_3) { create :user, role: "basic" }
      let(:user_4) { create :user, role: "basic" }

      before do
        source = create :invite
        create :experience_point, user: user_1, source: source, amount: 250, credited_at: start_date + 2.days
        create :experience_point, user: user_1, source: source, amount: 2000, credited_at: start_date - 10.days
        create :experience_point, user: user_1, source: source, amount: 200, credited_at: start_date - 30.days
        create :experience_point, user: user_2, source: source, amount: 150, credited_at: start_date
        create :experience_point, user: user_3, source: source, amount: 100, credited_at: start_date + 30.days
        create :experience_point, user: user_4, source: source, amount: 5000, credited_at: start_date + 15.days
        create :experience_point, user: talent_user, source: source, amount: 2000, credited_at: start_date + 15.days
        create :experience_point, user: talent_user, source: source, amount: 4000, credited_at: start_date + 10.days
      end

      response "200", "Leaderboard without user", save_example: true do
        let(:id) { nil }

        schema type: :object,
          properties: {
            leaderboard: {
              type: :object,
              properties: PublicAPI::ObjectProperties::EXPERIENCE_POINTS_LEADERBOARD_PROPERTIES
            }
          }

        run_test! do |response|
          data = JSON.parse(response.body)

          returned_leaderboard = data["leaderboard"]["results"]
          returned_user_leaderboard = data["leaderboard"]["talent_result"]
          returned_usernames = returned_leaderboard.map { |f| f["username"] }
          returned_scores = returned_leaderboard.map { |f| f["score"] }
          aggregate_failures do
            expect(returned_leaderboard.count).to eq 5
            expect(returned_usernames).to eq([talent_user.username, user_4.username, user_1.username, user_2.username, user_3.username])
            expect(returned_user_leaderboard).to eq(
              {
                "score" => 0,
                "position" => nil
              }
            )

            expect(returned_scores).to eq([6000, 5000, 250, 150, 100])
          end
        end
      end

      response "200", "Leaderboard with talent result", save_example: true do
        schema type: :object,
          properties: {
            leaderboard: {
              type: :object,
              properties: PublicAPI::ObjectProperties::EXPERIENCE_POINTS_LEADERBOARD_PROPERTIES
            }
          }

        run_test! do |response|
          data = JSON.parse(response.body)

          returned_leaderboard = data["leaderboard"]["results"]
          returned_user_leaderboard = data["leaderboard"]["talent_result"]
          returned_usernames = returned_leaderboard.map { |f| f["username"] }
          returned_scores = returned_leaderboard.map { |f| f["score"] }
          aggregate_failures do
            expect(returned_leaderboard.count).to eq 5
            expect(returned_usernames).to eq([talent_user.username, user_4.username, user_1.username, user_2.username, user_3.username])
            expect(returned_user_leaderboard).to eq(
              {
                "score" => 6000,
                "position" => 1
              }
            )

            expect(returned_scores).to eq([6000, 5000, 250, 150, 100])
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
