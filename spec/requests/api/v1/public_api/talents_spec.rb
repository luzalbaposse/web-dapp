require "swagger_helper"
require "rails_helper"

TALENT_PROPERTIES = {
  username: {type: :string},
  name: {type: :string},
  profile_picture_url: {type: :string, nullable: true},
  email: {type: :string},
  wallet_address: {type: :string, nullable: true}
}

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

      let!(:talent) { create(:user, wallet_id: wallet_id, display_name: "API user") }
      let(:wallet_id) { SecureRandom.hex }
      let(:id) { wallet_id }

      response "200", "talent found", save_example: true do
        schema type: :object,
          properties: TALENT_PROPERTIES,
          required: ["username", "email", "name"]

        run_test! do |response|
          data = JSON.parse(response.body)

          aggregate_failures do
            expect(data["username"]).to eq(talent.username)
            expect(data["name"]).to eq(talent.name)
            expect(data["email"]).to eq(talent.email)
            expect(data["wallet_address"]).to eq(talent.wallet_id)
            expect(data["profile_picture_url"]).to eq(talent.profile_picture_url)
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
