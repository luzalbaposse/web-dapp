require "swagger_helper"
require "rails_helper"

RSpec.describe "Sponsorships API" do
  path "/sponsors" do
    get "Retrieves the sponsors of a talent" do
      tags "Sponsors"
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

      let!(:user_1) { create :user }
      let!(:user_2) { create :user }

      before do
        create :sponsorship, talent: wallet_id, sponsor: user_1.wallet_id
        create :sponsorship, talent: wallet_id, sponsor: user_2.wallet_id
      end

      response "200", "talent found", save_example: true do
        schema type: :object,
          properties: {
            sponsors: {
              type: :array,
              items: {
                type: :object,
                properties: PublicAPI::ObjectProperties::SPONSORSHIP_PROPERTIES
              }
            },
            pagination: {
              type: :object,
              properties: PublicAPI::ObjectProperties::PAGINATION_PROPERTIES
            }
          }

        run_test! do |response|
          data = JSON.parse(response.body)

          returned_sponsors = data["sponsors"]
          returned_sponsor_usernames = returned_sponsors.map { |f| f["sponsor"]["username"] }
          returned_sponsored_usernames = returned_sponsors.map { |f| f["sponsored"]["username"] }
          returned_pagination = data["pagination"]
          aggregate_failures do
            expect(data["sponsors"].count).to eq 2
            expect(returned_sponsor_usernames).to match_array([user_1.username, user_2.username])
            expect(returned_sponsored_usernames).to match_array([talent_user.username, talent_user.username])

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

  path "/sponsorships" do
    get "Retrieves the sponsorships of a talent" do
      tags "Sponsorships"
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

      let!(:user_1) { create :user }
      let!(:user_2) { create :user }

      before do
        create :sponsorship, sponsor: wallet_id, talent: user_1.wallet_id
        create :sponsorship, sponsor: wallet_id, talent: user_2.wallet_id
      end

      response "200", "talent found", save_example: true do
        schema type: :object,
          properties: {
            sponsorships: {
              type: :array,
              items: {
                type: :object,
                properties: PublicAPI::ObjectProperties::SPONSORSHIP_PROPERTIES
              }
            },
            pagination: {
              type: :object,
              properties: PublicAPI::ObjectProperties::PAGINATION_PROPERTIES
            }
          }

        run_test! do |response|
          data = JSON.parse(response.body)

          returned_sponsorships = data["sponsorships"]
          returned_sponsor_usernames = returned_sponsorships.map { |f| f["sponsor"]["username"] }
          returned_sponsored_usernames = returned_sponsorships.map { |f| f["sponsored"]["username"] }
          returned_pagination = data["pagination"]
          aggregate_failures do
            expect(returned_sponsorships.count).to eq 2
            expect(returned_sponsor_usernames).to match_array([talent_user.username, talent_user.username])
            expect(returned_sponsored_usernames).to match_array([user_1.username, user_2.username])

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
