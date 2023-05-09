require "rails_helper"

RSpec.describe "validations", type: :request do
  before do
    stub_const("API::V1::PublicAPI::APIController::INTERNAL_DOMAINS", ["talentprotocol.com"])
    host! "app.talentprotocol.com"
  end

  describe "#username" do
    subject(:valid_username) { get username_api_v1_public_validations_path(username: username) }

    let(:username) { "testusername" }

    context "when the username is valid and not taken" do
      it "returns a successful response" do
        valid_username

        expect(response).to have_http_status(:ok)
      end

      it "renders a valid response" do
        valid_username

        expect(json).to eq({error: ""})
      end
    end

    context "when the username is taken" do
      before do
        create :user, username: username
      end

      it "renders an invalid response" do
        valid_username

        expect(json).to eq({error: "Username already taken."})
      end
    end

    context "when the username is invalid" do
      let(:username) { "test--.." }

      it "renders an invalid response" do
        valid_username

        expect(json).to eq({error: "Username only allows lower case letters and numbers."})
      end
    end
  end

  describe "#email" do
    subject(:valid_email) { get email_api_v1_public_validations_path(email: email) }

    let(:email) { "testmail@gmail.com" }

    context "when the email is valid and not taken" do
      it "returns a successful response" do
        valid_email

        expect(response).to have_http_status(:ok)
      end

      it "renders a valid response" do
        valid_email

        expect(json).to eq({error: ""})
      end
    end

    context "when the email is taken" do
      before do
        create :user, email: email
      end

      it "renders an invalid response" do
        valid_email

        expect(json).to eq({error: "Email already taken."})
      end
    end

    context "when the email is invalid" do
      let(:email) { "test" }

      it "renders an invalid response" do
        valid_email

        expect(json).to eq({error: "Email is not valid."})
      end
    end
  end
end
