require "rails_helper"

RSpec.describe "Sponsorships" do
  let!(:current_user) { create :user, :with_talent }

  describe "#create" do
    subject(:api_request) { post(api_v1_public_sponsorships_path(params: params, as: current_user), headers: headers) }

    let(:headers) { {} }
    let(:params) do
      {
        sponsorship: {
          tx_hash: "0x12312adc123",
          chain_id: "137"
        }
      }
    end

    before do
      stub_const("API::V1::PublicAPI::APIController::INTERNAL_DOMAINS", ["talentprotocol.com"])
    end

    context "when the request is internal" do
      before do
        host! "app.talentprotocol.com"
      end

      it "returns a successful response" do
        api_request

        expect(response).to have_http_status(:created)
      end

      it "enqueues a the job with the correct arguments" do
        api_request

        expect(SyncSponsorshipJob).to have_been_enqueued.with(
          "0x12312adc123",
          "137"
        )
      end

      context "when the params don't exist" do
        let(:params) { {sponsorship: {tx_hash: ""}} }

        it "returns an error response" do
          api_request

          expect(response).to have_http_status(:bad_request)
        end

        it "does not initializes the sponsorship sync service" do
          api_request

          expect { api_request }.not_to have_enqueued_job(SyncSponsorshipJob)
        end
      end
    end
  end
end
