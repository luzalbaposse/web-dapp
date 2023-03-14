require "rails_helper"

RSpec.describe "Messages", type: :request do
  describe "#create" do
    let(:create_user_request) { post users_path(params: params) }

    let(:params) do
      {
        username: username,
        email: email
      }
    end

    let(:username) { "dinis" }
    let(:email) { "dinis@talentprotocol.com" }

    let(:captcha_request) { "https://www.google.com/recaptcha/api/siteverify" }
    let(:captcha_response_body) do
      {
        success: captcha_success
      }
    end
    let(:captcha_success) { true }

    let(:create_user_class) { Users::Create }
    let(:create_user_service) { instance_double(create_user_class, call: result) }
    let(:result) do
      {
        success: true,
        user: build(:user)
      }
    end

    before do
      stub_request(:post, captcha_request).to_return(body: captcha_response_body.to_json)
      allow(create_user_class).to receive(:new).and_return(create_user_service)
    end

    it "initializes the create user service" do
      create_user_request

      aggregate_failures do
        expect(create_user_class).to have_received(:new)
        expect(create_user_service).to have_received(:call).with(
          email: email,
          username: username
        )
      end
    end

    it "returns a successful created response" do
      create_user_request

      expect(response).to have_http_status(:created)
    end

    context "when the create user service is not successful" do
      let(:result) do
        {
          success: false,
          field: "username",
          error: "Username already taken."
        }
      end

      it "returns a conflict response" do
        create_user_request

        aggregate_failures do
          expect(response).to have_http_status(:conflict)
          expect(json).to eq(result)
        end
      end
    end

    context "when the captcha is not successful" do
      let(:captcha_success) { false }

      it "returns a conflict response" do
        create_user_request

        aggregate_failures do
          expect(response).to have_http_status(:conflict)
          expect(json).to eq({
            error: "We were unable to validate your captcha.",
            field: "captcha"
          })
        end
      end
    end

    context "when the username is invalid" do
      let(:username) { "test-1" }

      it "returns a conflict response" do
        create_user_request

        aggregate_failures do
          expect(response).to have_http_status(:conflict)
          expect(json).to eq({
            error: "Invalid username.",
            field: "username"
          })
        end
      end
    end

    context "when the email is invalid" do
      let(:email) { "1234" }

      it "returns a conflict response" do
        create_user_request

        aggregate_failures do
          expect(response).to have_http_status(:conflict)
          expect(json).to eq({
            error: "Email is not valid.",
            field: "email"
          })
        end
      end
    end
  end
end
