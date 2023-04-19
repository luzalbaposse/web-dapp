require "rails_helper"

RSpec.describe "Network", type: :request do
  describe "#show" do
    subject(:get_network) { get network_path(as: current_user) }

    let(:current_user) { create :user }

    it "returns a successful response" do
      get_network

      expect(response).to have_http_status(:ok)
    end
  end
end
