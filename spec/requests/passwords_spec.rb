require "rails_helper"

RSpec.describe "Passwords", type: :request do
  describe "#update" do
    let(:update_password) { put user_password_path(user_id: user_id, params: params) }

    let(:params) do
      {
        token: confirmation_token,
        password_reset: {
          password: "Test123"
        }
      }
    end

    let!(:user) { create :user, confirmation_token: confirmation_token }
    let(:confirmation_token) { SecureRandom.hex }
    let(:user_id) { user.uuid }
    let(:update_success) { true }

    before do
      allow(User).to receive(:find_by).and_return(user)
      allow(user).to receive(:update_password).and_return(update_success)
    end

    it "returns a successful response" do
      update_password

      expect(response).to have_http_status(:ok)
    end

    it "returns the user uuid" do
      update_password

      expect(json).to eq(
        {
          id: user.uuid
        }
      )
    end

    it "sets the new user password" do
      update_password

      expect(user).to have_received(:update_password).with("Test123")
    end

    context "when the password update is unsuccessful" do
      let(:update_success) { false }

      it "returns an unauthorized response" do
        update_password

        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end
