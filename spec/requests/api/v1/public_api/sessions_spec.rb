require "rails_helper"

RSpec.describe "Sessions" do
  let!(:current_user) { create :user }

  describe "#valid" do
    subject(:api_request) { get(logged_in_user_api_v1_public_sessions_path(as: current_user), headers: headers) }

    let(:headers) { {} }

    context "when the request is external" do
      before do
        ENV["INTERNAL_DOMAINS"] = "talentprotocol.com"
        host! "bounty.com"
      end

      let!(:api_key) { create :api_key, :activated, access_key: access_key }
      let(:access_key) { SecureRandom.hex }

      let(:headers) do
        {
          "X-API-KEY": access_key
        }
      end

      it "returns a bad request response" do
        api_request

        expect(response).to have_http_status(:bad_request)
        expect(json[:error]).to eq "Endpoint unavailable."
      end

      it "does not enqueue a job to log the request" do
        expect { api_request }.not_to have_enqueued_job(API::LogRequestJob)
      end
    end

    context "when the request is internal" do
      before do
        ENV["INTERNAL_DOMAINS"] = "talentprotocol.com"
        host! "app.talentprotocol.com"
      end

      context "when the user is logged in" do
        it "returns a successful response" do
          api_request

          expect(response).to have_http_status(:ok)
        end

        it "returns the logged in user" do
          api_request

          aggregate_failures do
            expect(json[:user][:id]).to eq(current_user.uuid)
            expect(json[:user][:username]).to eq(current_user.username)
          end
        end
      end

      context "when the user is not logged in" do
        let(:current_user) { nil }

        it "returns a nou found response" do
          api_request

          expect(response).to have_http_status(:not_found)
        end
      end
    end
  end
end
