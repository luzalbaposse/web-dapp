require "swagger_helper"
require "rails_helper"

RSpec.describe "Invited talents API", type: :request do
  before do
    stub_const("API::V1::PublicAPI::APIController::INTERNAL_DOMAINS", ["talentprotocol.com"])
    host! "app.talentprotocol.com"
  end

  path "/invited_talents" do
    get "Retrieves a list of invited talents" do
      tags "Invited Talents"
      consumes "application/json"
      produces "application/json"
      parameter name: :cursor, in: :query, type: :string, description: "The cursor to fetch the next page"
      parameter name: "X-API-KEY", in: :header, type: :string, description: "Your Talent Protocol API key"

      let!(:api_key_object) { create(:api_key, :activated, access_key: access_key) }
      let(:access_key) { SecureRandom.hex }
      let(:"X-API-KEY") { access_key }
      let(:cursor) { nil }

      let!(:user) { create(:user, :with_talent_token, display_name: "API user") }
      let!(:invite) { create :invite, user: user }

      let!(:invited_user_one) { create :user, invited: invite, created_at: ParticipationPoints::CreditInvitePoints::START_DATE + 1 }
      let!(:talent_one) { create :talent, user: invited_user_one, verified: true }
      let!(:invited_user_two) { create :user, invited: invite, created_at: ParticipationPoints::CreditInvitePoints::START_DATE - 20 }
      let!(:talent_two) { create :talent, user: invited_user_two }
      let!(:token_two) { create :talent_token, talent: talent_two, deployed: true, deployed_at: ParticipationPoints::CreditInvitePoints::START_DATE - 5 }
      let!(:invited_user_three) { create :user, invited: invite, created_at: ParticipationPoints::CreditInvitePoints::START_DATE + 4 }
      let!(:talent_three) { create :talent, user: invited_user_three, verified: false }
      let!(:invited_user_four) { create :user, invited: invite, created_at: ParticipationPoints::CreditInvitePoints::START_DATE - 4 }
      let!(:talent_four) { create :talent, user: invited_user_four, verified: true }
      let!(:token_four) { create :talent_token, talent: talent_four, deployed: true, deployed_at: ParticipationPoints::CreditInvitePoints::START_DATE + 4 }
      let!(:invited_user_five) { create :user, invited: invite, created_at: ParticipationPoints::CreditInvitePoints::START_DATE + 6 }
      let!(:talent_five) { create :talent, user: invited_user_five, verified: false }

      response "200", "Invited talents retrieved", document: false do
        schema type: :object,
          properties: {
            talents: {
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

        before do
          allow_any_instance_of(API::V1::PublicAPI::APIController).to receive(:current_user).and_return(user)
        end

        run_test! do |response|
          data = JSON.parse(response.body)

          returned_talents = data["talents"]
          returned_pagination = data["pagination"]

          returned_talent_one = returned_talents.find { |t| t["id"] == invited_user_one.uuid }
          returned_talent_two = returned_talents.find { |t| t["id"] == invited_user_two.uuid }
          returned_talent_three = returned_talents.find { |t| t["id"] == invited_user_three.uuid }
          returned_talent_four = returned_talents.find { |t| t["id"] == invited_user_four.uuid }
          returned_talent_five = returned_talents.find { |t| t["id"] == invited_user_five.uuid }

          aggregate_failures do
            expect(returned_talent_one["participation_points_amount"]).to eq(ParticipationPoints::CreditInvitePoints::AMOUNT)
            expect(returned_talent_one["tal_amount"]).to eq(0)
            expect(returned_talent_one["status"]).to eq("Verified")
            expect(returned_talent_one["joined_at"]).to eq(invited_user_one.created_at.to_s)

            expect(returned_talent_two["participation_points_amount"]).to eq(0)
            expect(returned_talent_two["tal_amount"]).to eq(100)
            expect(returned_talent_two["status"]).to eq("Token Launched")
            expect(returned_talent_two["joined_at"]).to eq(invited_user_two.created_at.to_s)

            expect(returned_talent_three["participation_points_amount"]).to eq(0)
            expect(returned_talent_three["tal_amount"]).to eq(0)
            expect(returned_talent_three["status"]).to eq("Pending Verification")
            expect(returned_talent_three["joined_at"]).to eq(invited_user_three.created_at.to_s)

            expect(returned_talent_four["participation_points_amount"]).to eq(0)
            expect(returned_talent_four["tal_amount"]).to eq(0)
            expect(returned_talent_four["status"]).to eq("Pending Token Launch")
            expect(returned_talent_four["joined_at"]).to eq(invited_user_four.created_at.to_s)

            expect(returned_talent_five["participation_points_amount"]).to eq(0)
            expect(returned_talent_five["tal_amount"]).to eq(0)
            expect(returned_talent_five["status"]).to eq("Pending Verification")
            expect(returned_talent_five["joined_at"]).to eq(invited_user_five.created_at.to_s)

            expect(returned_pagination["total"]).to eq 5
          end
        end
      end

      response "401", "unauthorized request", document: false do
        let(:"X-API-KEY") { "invalid" }
        run_test!
      end
    end
  end
end
