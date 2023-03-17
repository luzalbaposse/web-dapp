require "rails_helper"

RSpec.describe "Sponsorships" do
  let!(:current_user) { create :user, :with_talent }
  let(:params) { {sponsorship: {tx_hash: "0x12312adc123"}} }

  describe "#create" do
    subject(:api_request) { post(api_v1_public_sponsorships_path(params: params, as: current_user), headers: headers) }

    let(:headers) { {} }

    before do
      stub_const("API::V1::PublicAPI::APIController::INTERNAL_DOMAINS", ["talentprotocol.com"])
      allow_any_instance_of(Web3::SponsorshipSync).to receive(:call).and_return(true)
    end

    context "when the request is internal" do
      before do
        host! "app.talentprotocol.com"
      end

      context "when the service can be called" do
        it "returns a successful response" do
          api_request

          expect(response).to have_http_status(:created)
        end
      end

      context "when the params don't exist" do
        let(:params) { {sponsorship: {tx_hash: ""}} }

        it "returns an error response" do
          api_request

          expect(response).to have_http_status(:bad_request)
        end
      end
    end
  end
end
