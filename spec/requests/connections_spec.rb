require "rails_helper"

RSpec.describe "Connections", type: :request do
  describe "#show" do
    subject(:get_connection) { get connection_path(as: current_user) }

    let(:current_user) { create :user }

    it "returns a successful response" do
      get_connection

      expect(response).to have_http_status(:ok)
    end
  end
end
