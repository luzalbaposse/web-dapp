require "rails_helper"

RSpec.describe "Rack::Attack", type: :request do
  describe "Rack::Attack.throttle - passwords/ip" do
    let(:current_user) { create :user }
    let(:headers) { {REMOTE_ADDR: "115.15.20.0"} }
    let(:params) { {password: {email: "admin@talentprotocol.com"}} }

    before do
      Rack::Attack.enabled = true
      Rack::Attack.reset!
      Rack::Attack.cache.store = ActiveSupport::Cache::MemoryStore.new
      Rails.cache.clear
    end

    it "successful for 5 requests, then blocks the endpoint for that user" do
      5.times do
        post(passwords_path(params: params), headers: headers)

        expect(response).to have_http_status(:ok)
      end

      post(passwords_path(params: params), headers: headers)

      expect(response.body).to include("Retry later")
      expect(response).to have_http_status(:service_unavailable)

      # We can visit other paths
      get(api_v1_notifications_path(params: params, as: current_user), headers: headers)

      expect(response).to have_http_status(:ok)

      # Resets in 30 minutes
      travel_to(31.minutes.from_now) do
        post(passwords_path(params: params), headers: headers)
        expect(response).to have_http_status(:ok)
      end
    end
  end
end
