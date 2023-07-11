require "rails_helper"

RSpec.describe "Portfolio", type: :request do
  let(:current_user) { create :user }
  let!(:talent) { create :talent, user: current_user }

  describe "#show" do
    subject(:get_portfolio) { get portfolio_path(as: current_user) }

    it "returns a successful response" do
      get_portfolio

      expect(response).to have_http_status(:ok)
    end
  end
end
