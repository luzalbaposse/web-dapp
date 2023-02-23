require "swagger_helper"
require "rails_helper"

RSpec.describe "Talents API" do
  path "/talents/{id}" do
    get "Retrieves a talent" do
      tags "Talents"
      consumes "application/json"
      produces "application/json"
      parameter name: :id, in: :path, type: :string, description: "Wallet address or username"
      parameter name: "X-API-KEY", in: :header, type: :string, description: "Your Talent Protocol API key"

      let!(:api_key_object) { create(:api_key, :activated, access_key: access_key) }
      let(:access_key) { SecureRandom.hex }
      let(:"X-API-KEY") { access_key }

      let!(:talent) { create(:user, :with_talent_token, wallet_id: wallet_id, display_name: "API user") }
      let(:wallet_id) { SecureRandom.hex }
      let(:id) { wallet_id }

      before do
        user_1 = create :user
        user_2 = create :user, :with_talent_token

        create :follow, user: user_1, follower: talent
        create :follow, user: user_2, follower: talent
        create :follow, user: talent, follower: user_1

        create :talent_supporter, supporter_wallet_id: talent.wallet_id, talent_contract_id: user_2.talent.talent_token.contract_id, amount: "2000000"
        create :talent_supporter, supporter_wallet_id: user_1.wallet_id, talent_contract_id: talent.talent.talent_token.contract_id, amount: "1000000"
      end

      response "200", "talent found", save_example: true do
        schema type: :object,
          properties: {
            talent: {
              type: :object,
              properties: PublicAPI::ObjectProperties::TALENT_PROPERTIES
            }
          }

        run_test! do |response|
          data = JSON.parse(response.body)

          returned_talent = data["talent"]
          aggregate_failures do
            expect(returned_talent["username"]).to eq(talent.username)
            expect(returned_talent["name"]).to eq(talent.name)
            expect(returned_talent["email"]).to eq(talent.email)
            expect(returned_talent["wallet_address"]).to eq(talent.wallet_id)
            expect(returned_talent["profile_picture_url"]).to eq(talent.profile_picture_url)
            expect(returned_talent["followers_count"]).to eq(1)
            expect(returned_talent["following_count"]).to eq(2)
            expect(returned_talent["supporters_count"]).to eq(1)
            expect(returned_talent["supporting_count"]).to eq(1)
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
