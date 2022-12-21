require "rails_helper"

RSpec.describe "WithPersonaRequests", type: :request do
  let(:current_user) { create :user }

  describe "#update" do
    let!(:with_persona_request) do
      create :with_persona_request, month: Date.today.month, year: Date.today.year, requests_counter: 1
    end
    subject(:update_with_persona_request) { put api_v1_with_persona_requests_path(as: current_user) }

    context "when the params are all valid" do
      it "returns a successful response" do
        update_with_persona_request

        expect(response).to have_http_status(:ok)
      end

      it "updates the with_persona_request" do
        update_with_persona_request

        with_persona_request.reload

        aggregate_failures do
          expect(with_persona_request.requests_counter).to eq 2
        end
      end
    end
  end
end
