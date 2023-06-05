require "rails_helper"

RSpec.describe "Portfolio Supporters", type: :request do
  let(:current_user) { create :user }

  describe "#index" do
    subject(:get_supporters) { get api_v1_portfolio_supporters_path(params: params, as: current_user) }

    let!(:user_one) { create :user, wallet_id: wallet_one }
    let!(:user_two) { create :user, wallet_id: wallet_two }
    let(:wallet_one) { SecureRandom.hex }
    let(:wallet_two) { SecureRandom.hex }

    let(:params) do
      {
        supporters: [wallet_one, wallet_two]
      }
    end

    it "returns a successful response" do
      get_supporters

      expect(response).to have_http_status(:ok)
    end

    it "returns the correct json info" do
      get_supporters

      expect(json[:supporters]).to match_array([
        {
          id: user_one.uuid,
          wallet_id: user_one.wallet_id,
          profile_picture_url: user_one.profile_picture_url,
          username: user_one.username,
          messaging_disabled: user_one.messaging_disabled
        },
        {
          id: user_two.uuid,
          wallet_id: user_two.wallet_id,
          profile_picture_url: user_two.profile_picture_url,
          username: user_two.username,
          messaging_disabled: user_two.messaging_disabled
        }
      ])
    end
  end
end
