require "swagger_helper"
require "rails_helper"

RSpec.describe "Career updates API" do
  path "/career_updates" do
    get "Retrieves the career updates of a talent" do
      tags "Career Updates"
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

      let!(:career_update_one) { create :career_update, user: talent_user }
      let!(:career_update_two) { create :career_update, user: talent_user }

      response "200", "talent found", save_example: true do
        schema type: :object,
          properties: {
            career_updates: {
              type: :array,
              items: {
                type: :object,
                properties: PublicAPI::ObjectProperties::CAREER_UPDATES_PROPERTIES
              }
            },
            pagination: {
              type: :object,
              properties: PublicAPI::ObjectProperties::PAGINATION_PROPERTIES
            }
          }

        run_test! do |response|
          data = JSON.parse(response.body)

          returned_messages = data["career_updates"].map { |f| f["message"] }
          returned_pagination = data["pagination"]
          aggregate_failures do
            expect(data["career_updates"].count).to eq 2
            expect(returned_messages).to match_array([career_update_one.text, career_update_two.text])

            expect(returned_pagination["total"]).to eq 2
            expect(returned_pagination["cursor"]).to eq nil
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
    post "Creates a career update for the talent" do
      tags "Career Updates"
      consumes "application/json"
      produces "application/json"
      parameter name: :career_update, in: :body, schema: {
        type: :object,
        properties: {
          career_update: {
            type: :object,
            properties: {
              message: {type: :string, description: "The content of the career update"}
            }
          },
          talent: {
            type: :object,
            properties: {
              id: {type: :string, description: "Wallet address or username"}
            }
          }
        },
        required: ["message", "user"]
      }
      parameter name: "X-API-KEY", in: :header, type: :string, description: "Your Talent Protocol API key"

      let!(:api_key_object) { create(:api_key, :activated, access_key: access_key) }
      let(:access_key) { SecureRandom.hex }
      let(:"X-API-KEY") { access_key }

      let!(:talent_user) { create(:user, :with_talent_token, wallet_id: wallet_id, display_name: "API user") }
      let(:wallet_id) { SecureRandom.hex }
      let(:id) { wallet_id }

      let(:message) { "Created Update!" }

      let(:career_update) do
        {
          career_update: {
            message: message
          },
          talent: {
            id: id
          }
        }
      end

      response "201", "talent found", save_example: true do
        schema type: :object,
          properties: {
            career_update: {
              type: :object,
              properties: PublicAPI::ObjectProperties::CAREER_UPDATES_PROPERTIES
            }
          }

        run_test! do |response|
          data = JSON.parse(response.body)

          created_career_update = CareerUpdate.last
          returned_career_update = data["career_update"]
          aggregate_failures do
            expect(returned_career_update["id"]).to eq created_career_update.uuid
            expect(returned_career_update["message"]).to eq message
          end
        end
      end

      response "404", "talent not found" do
        let(:id) { "invalid" }
        run_test!
      end

      response "400", "message not present" do
        let(:message) { "" }
        run_test!
      end

      response "401", "unauthorized request" do
        let(:"X-API-KEY") { "invalid" }
        run_test!
      end
    end
  end
end
