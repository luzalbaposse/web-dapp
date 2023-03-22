require "rails_helper"

RSpec.describe "Subscribes", type: :request do
  let(:current_user) { create :user }

  describe "#create" do
    subject(:create_subscribe_request) { post api_v1_public_subscribes_path(params: params, as: current_user) }

    let(:params) do
      {
        talent_id: subscribing_user_id
      }
    end

    let(:subscribing_user) { create :user }
    let(:subscribing_user_id) { subscribing_user.uuid }

    let(:create_subscribe_class) { Subscribes::Create }
    let(:create_subscribe_instance) { instance_double(create_subscribe_class, call: true) }

    before do
      stub_const("API::V1::PublicAPI::APIController::INTERNAL_DOMAINS", ["talentprotocol.com"])
      host! "app.talentprotocol.com"
      allow(create_subscribe_class).to receive(:new).and_return(create_subscribe_instance)
    end

    it "returns a successful response" do
      create_subscribe_request

      expect(response).to have_http_status(:created)
    end

    it "initializes and calls the create subscribe service with the correct params" do
      create_subscribe_request

      aggregate_failures do
        expect(create_subscribe_class).to have_received(:new).with(
          subscribing_user: subscribing_user,
          subscriber_user: current_user
        )
        expect(create_subscribe_instance).to have_received(:call)
      end
    end

    context "when the subscribing user does not exist" do
      let(:subscribing_user_id) { -1 }

      it "returns a not found response" do
        create_subscribe_request

        expect(response).to have_http_status(:not_found)
      end
    end

    context "when the create subscribe service returns a creation error" do
      let(:error) { create_subscribe_class::CreationError.new }

      before do
        allow(create_subscribe_instance).to receive(:call).and_raise(error)
        allow(Rollbar).to receive(:error)
      end

      it "returns a bad request response" do
        create_subscribe_request

        expect(response).to have_http_status(:bad_request)
      end

      it "raises the error to Rollbar" do
        create_subscribe_request

        expect(Rollbar).to have_received(:error).with(
          error,
          "Error creating subscribe",
          subscriber_user_id: current_user.id,
          subscribing_user_id: subscribing_user.id
        )
      end
    end

    context "when the create subscribe service returns an already exists error" do
      let(:error) { create_subscribe_class::AlreadyExistsError.new }

      before do
        allow(create_subscribe_instance).to receive(:call).and_raise(error)
        allow(Rollbar).to receive(:error)
      end

      it "returns a conflict response response" do
        create_subscribe_request

        expect(response).to have_http_status(:conflict)
      end

      it "does not raise the error to Rollbar" do
        create_subscribe_request

        expect(Rollbar).not_to have_received(:error)
      end
    end
  end

  describe "#destroy" do
    subject(:destroy_subscribe_request) { delete api_v1_public_subscribes_path(params: params, as: current_user) }

    let(:params) do
      {
        talent_id: subscribing_user_id
      }
    end

    let(:subscribing_user) { create :user }
    let(:subscribing_user_id) { subscribing_user.uuid }

    let!(:subscribe) { create :subscribe, subscriber: current_user, user: subscribing_user }

    let(:destroy_subscribe_class) { Subscribes::Destroy }
    let(:destroy_subscribe_instance) { instance_double(destroy_subscribe_class, call: true) }

    before do
      allow(destroy_subscribe_class).to receive(:new).and_return(destroy_subscribe_instance)

      stub_const("API::V1::PublicAPI::APIController::INTERNAL_DOMAINS", ["talentprotocol.com"])
      host! "app.talentprotocol.com"
    end

    it "returns a successful response" do
      destroy_subscribe_request

      expect(response).to have_http_status(:ok)
    end

    it "initializes and calls the destroy subscribe service with the correct params" do
      destroy_subscribe_request

      aggregate_failures do
        expect(destroy_subscribe_class).to have_received(:new).with(
          subscribe: subscribe
        )
        expect(destroy_subscribe_instance).to have_received(:call)
      end
    end

    context "when the subscribing user does not exist" do
      let(:subscribing_user_id) { -1 }

      it "returns a not found response" do
        destroy_subscribe_request

        expect(response).to have_http_status(:not_found)
      end
    end

    context "when the create subscribe service returns a destroy error" do
      let(:error) { destroy_subscribe_class::DestroyError.new }

      before do
        allow(destroy_subscribe_instance).to receive(:call).and_raise(error)
        allow(Rollbar).to receive(:error)
      end

      it "returns a bad request response response" do
        destroy_subscribe_request

        expect(response).to have_http_status(:bad_request)
      end

      it "raises the error to Rollbar" do
        destroy_subscribe_request

        expect(Rollbar).to have_received(:error).with(
          error,
          "Error destroying subscribe",
          subscribe_id: subscribe.id,
          subscriber_user_id: current_user.id,
          subscribing_user_id: subscribing_user.id
        )
      end
    end
  end
end
