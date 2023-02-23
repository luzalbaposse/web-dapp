require "swagger_helper"
require "rails_helper"

RSpec.describe "Followers API" do
  path "/followers" do
    get "Retrieves the followers of a talent" do
      tags "Followers"
      consumes "application/json"
      produces "application/json"
      parameter name: :id, in: :query, type: :string, description: "Wallet address or username"
      parameter name: "X-API-KEY", in: :header, type: :string, description: "Your Talent Protocol API key"

      let!(:api_key_object) { create(:api_key, :activated, access_key: access_key) }
      let(:access_key) { SecureRandom.hex }
      let(:"X-API-KEY") { access_key }

      let!(:talent_user) { create(:user, :with_talent_token, wallet_id: wallet_id, display_name: "API user") }
      let(:wallet_id) { SecureRandom.hex }
      let(:id) { wallet_id }

      let(:user_1) { create :user }
      let(:user_2) { create :user }

      before do
        create :follow, user: talent_user, follower: user_1
        create :follow, user: talent_user, follower: user_2
      end

      response "200", "talent found", save_example: true do
        schema type: :object,
          properties: {
            followers: {
              type: :array,
              items: {
                type: PublicAPI::ObjectProperties::TALENT_PROPERTIES
              }
            }
          }

        run_test! do |response|
          data = JSON.parse(response.body)

          returned_usernames = data["followers"].map { |f| f["username"] }
          aggregate_failures do
            expect(data["followers"].count).to eq 2
            expect(returned_usernames).to match_array([user_1.username, user_2.username])
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
