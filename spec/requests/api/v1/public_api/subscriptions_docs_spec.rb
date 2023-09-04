require "swagger_helper"
require "rails_helper"

RSpec.describe "Subscriptions API" do
  path "/subscribers" do
    get "Retrieves the subscribers of a talent" do
      tags "Subscribers"
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

      let(:user_1) { create :user }
      let(:user_2) { create :user }
      let(:user_3) { create :user }

      before do
        stub_const("API::V1::PublicAPI::APIController::INTERNAL_DOMAINS", ["talentprotocol.com"])
        host! "app.talentprotocol.com"

        create :subscription, user: talent_user, subscriber: user_1, subscribed_back_status: "accepted"
        create :subscription, user: talent_user, subscriber: user_2, subscribed_back_status: "no_request"
        create :subscription, user: talent_user, subscriber: user_3, subscribed_back_status: "pending"
      end

      response "200", "talent found", save_example: true do
        schema type: :object,
          properties: {
            subscribers: {
              type: :array,
              items: {
                type: :object,
                properties: PublicAPI::ObjectProperties::TALENT_PROPERTIES
              }
            },
            pagination: {
              type: :object,
              properties: PublicAPI::ObjectProperties::PAGINATION_PROPERTIES
            }
          }

        run_test! do |response|
          data = JSON.parse(response.body)

          returned_subscribers = data["subscribers"]
          returned_usernames = returned_subscribers.map { |f| f["username"] }
          returned_pagination = data["pagination"]
          aggregate_failures do
            expect(data["subscribers"].count).to eq 3
            expect(returned_usernames).to match_array([user_1.username, user_2.username, user_3.username])

            expect(returned_pagination["total"]).to eq 3
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
  end

  path "/pending_subscribers" do
    get "Retrieves the pending subscribers of a talent" do
      tags "Subscribers"
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

      let(:user_1) { create :user }
      let(:user_2) { create :user }

      before do
        create :pending_subscription, user: talent_user, subscriber: user_1
        create :pending_subscription, user: talent_user, subscriber: user_2
      end

      response "200", "talent found", save_example: true do
        schema type: :object,
          properties: {
            subscribers: {
              type: :array,
              items: {
                type: :object,
                properties: PublicAPI::ObjectProperties::TALENT_PROPERTIES
              }
            },
            pagination: {
              type: :object,
              properties: PublicAPI::ObjectProperties::PAGINATION_PROPERTIES
            }
          }

        run_test! do |response|
          data = JSON.parse(response.body)

          returned_subscribers = data["subscribers"]
          returned_usernames = returned_subscribers.map { |f| f["username"] }
          returned_pagination = data["pagination"]
          aggregate_failures do
            expect(data["subscribers"].count).to eq 2
            expect(returned_usernames).to match_array([user_1.username, user_2.username])

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
  end

  path "/subscribing" do
    get "Retrieves the talents a talent is subscribing" do
      tags "Subscribing"
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

      let(:user_1) { create :user }
      let(:user_2) { create :user }

      before do
        create :subscription, user: user_1, subscriber: talent_user
        create :subscription, user: user_2, subscriber: talent_user
      end

      response "200", "talent found", save_example: true do
        schema type: :object,
          properties: {
            subscribing: {
              type: :array,
              items: {
                type: :object,
                properties: PublicAPI::ObjectProperties::TALENT_PROPERTIES
              }
            },
            pagination: {
              type: :object,
              properties: PublicAPI::ObjectProperties::PAGINATION_PROPERTIES
            }
          }

        run_test! do |response|
          data = JSON.parse(response.body)

          returned_subscribing = data["subscribing"]
          returned_usernames = returned_subscribing.map { |f| f["username"] }
          returned_pagination = data["pagination"]
          aggregate_failures do
            expect(data["subscribing"].count).to eq 2
            expect(returned_usernames).to match_array([user_1.username, user_2.username])

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
  end
end
