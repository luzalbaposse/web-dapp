require "swagger_helper"
require "rails_helper"

RSpec.describe "Connections API" do
  path "/connections" do
    get "Retrieves the connections of a talent" do
      tags "Connections"
      consumes "application/json"
      produces "application/json"
      parameter name: :id, in: :query, type: :string, description: "Wallet address or username"
      parameter name: :keyword, in: :query, type: :string, description: "Keyword search to filter by the connected user name"
      parameter name: :connection_type, in: :query, schema: {type: :string, enum: ["all", "supporters", "supporting"]}, description: "Filter by a specific connection type"
      parameter name: :cursor, in: :query, type: :string, description: "The cursor to fetch the next page"
      parameter name: "X-API-KEY", in: :header, type: :string, description: "Your Talent Protocol API key"

      let!(:api_key_object) { create(:api_key, :activated, access_key: access_key) }
      let(:access_key) { SecureRandom.hex }
      let(:"X-API-KEY") { access_key }

      let!(:talent_user) { create(:user, :with_talent_token, wallet_id: wallet_id, display_name: "API user") }
      let(:wallet_id) { SecureRandom.hex }
      let(:id) { wallet_id }
      let(:cursor) { nil }
      let(:keyword) { nil }
      let(:connection_type) { nil }

      let(:user_1) { create :user, username: "111111111" }
      let(:user_2) { create :user, username: "222222222" }
      let(:user_3) { create :user, username: "333333333" }
      let(:user_4) { create :user, username: "444444444" }

      before do
        create :connection, user: talent_user, connected_user: user_1, connection_type: "mutual_stake", connection_types: ["staking", "staker"]
        create :connection, user: talent_user, connected_user: user_2, connection_type: "staker", connection_types: ["staker"]
        create :connection, user: talent_user, connected_user: user_3, connection_type: "staking", connection_types: ["staking"]
        create :connection, user: talent_user, connected_user: user_4, connection_type: "subscriber", connection_types: ["subscriber"]
      end

      response "200", "talent found", save_example: true do
        schema type: :object,
          properties: {
            connections: {
              type: :array,
              items: {
                type: :object,
                properties: PublicAPI::ObjectProperties::CONNECTION_PROPERTIES
              }
            },
            pagination: {
              type: :object,
              properties: PublicAPI::ObjectProperties::PAGINATION_PROPERTIES
            }
          }

        run_test! do |response|
          data = JSON.parse(response.body)

          returned_connections = data["connections"]
          returned_usernames = returned_connections.map { |f| f["username"] }
          returned_pagination = data["pagination"]
          aggregate_failures do
            expect(data["connections"].count).to eq 4
            expect(returned_usernames).to match_array([user_1.username, user_2.username, user_3.username, user_4.username])

            expect(returned_pagination["total"]).to eq 4
          end
        end
      end

      response "200", "passing supporting as connection type", save_example: true do
        let(:connection_type) { "supporting" }

        schema type: :object,
          properties: {
            connections: {
              type: :array,
              items: {
                type: :object,
                properties: PublicAPI::ObjectProperties::CONNECTION_PROPERTIES
              }
            },
            pagination: {
              type: :object,
              properties: PublicAPI::ObjectProperties::PAGINATION_PROPERTIES
            }
          }

        run_test! do |response|
          data = JSON.parse(response.body)

          returned_connections = data["connections"]
          returned_usernames = returned_connections.map { |f| f["username"] }
          returned_pagination = data["pagination"]
          aggregate_failures do
            expect(data["connections"].count).to eq 2
            expect(returned_usernames).to match_array([user_1.username, user_3.username])

            expect(returned_pagination["total"]).to eq 2
          end
        end
      end

      response "200", "passing supporters as connection type", save_example: true do
        let(:connection_type) { "supporters" }

        schema type: :object,
          properties: {
            connections: {
              type: :array,
              items: {
                type: :object,
                properties: PublicAPI::ObjectProperties::CONNECTION_PROPERTIES
              }
            },
            pagination: {
              type: :object,
              properties: PublicAPI::ObjectProperties::PAGINATION_PROPERTIES
            }
          }

        run_test! do |response|
          data = JSON.parse(response.body)

          returned_connections = data["connections"]
          returned_usernames = returned_connections.map { |f| f["username"] }
          returned_pagination = data["pagination"]
          aggregate_failures do
            expect(data["connections"].count).to eq 3
            expect(returned_usernames).to match_array([user_1.username, user_2.username, user_4.username])

            expect(returned_pagination["total"]).to eq 3
          end
        end
      end

      response "200", "passing gibberish as connection type", save_example: true do
        let(:connection_type) { "gibberish" }

        schema type: :object,
          properties: {
            connections: {
              type: :array,
              items: {
                type: :object,
                properties: PublicAPI::ObjectProperties::CONNECTION_PROPERTIES
              }
            },
            pagination: {
              type: :object,
              properties: PublicAPI::ObjectProperties::PAGINATION_PROPERTIES
            }
          }

        run_test! do |response|
          data = JSON.parse(response.body)

          returned_connections = data["connections"]
          returned_usernames = returned_connections.map { |f| f["username"] }
          returned_pagination = data["pagination"]
          aggregate_failures do
            expect(data["connections"].count).to eq 0
            expect(returned_usernames).to match_array([])

            expect(returned_pagination["total"]).to eq 0
          end
        end
      end

      response "200", "passing a keyword", save_example: true do
        let(:keyword) { "11111" }

        schema type: :object,
          properties: {
            connections: {
              type: :array,
              items: {
                type: :object,
                properties: PublicAPI::ObjectProperties::CONNECTION_PROPERTIES
              }
            },
            pagination: {
              type: :object,
              properties: PublicAPI::ObjectProperties::PAGINATION_PROPERTIES
            }
          }

        run_test! do |response|
          data = JSON.parse(response.body)

          returned_connections = data["connections"]
          returned_usernames = returned_connections.map { |f| f["username"] }
          returned_pagination = data["pagination"]
          aggregate_failures do
            expect(data["connections"].count).to eq 1
            expect(returned_usernames).to match_array([user_1.username])

            expect(returned_pagination["total"]).to eq 1
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
