require "rails_helper"

RSpec.describe "Subscriptions", type: :request do
  let(:current_user) { create :user }

  describe "#create" do
    subject(:create_subscription_request) { post api_v1_public_subscriptions_path(params: params, as: current_user) }

    let(:params) do
      {
        talent_id: subscribing_user_id
      }
    end

    let(:subscribing_user) { create :user }
    let(:subscribing_user_id) { subscribing_user.uuid }

    let(:create_subscription_class) { Subscriptions::Create }
    let(:create_subscription_instance) { instance_double(create_subscription_class, call: true) }

    before do
      stub_const("API::V1::PublicAPI::APIController::INTERNAL_DOMAINS", ["talentprotocol.com"])
      host! "app.talentprotocol.com"
      allow(create_subscription_class).to receive(:new).and_return(create_subscription_instance)
    end

    it "returns a successful response" do
      create_subscription_request

      expect(response).to have_http_status(:created)
    end

    it "initializes and calls the create subscribe service with the correct params" do
      create_subscription_request

      aggregate_failures do
        expect(create_subscription_class).to have_received(:new).with(
          subscribing_user: subscribing_user,
          subscriber_user: current_user
        )
        expect(create_subscription_instance).to have_received(:call)
      end
    end

    context "when the subscribing user does not exist" do
      let(:subscribing_user_id) { -1 }

      it "returns a not found response" do
        create_subscription_request

        expect(response).to have_http_status(:not_found)
      end
    end

    context "when the create subscribe service returns a creation error" do
      let(:error) { create_subscription_class::CreationError.new }

      before do
        allow(create_subscription_instance).to receive(:call).and_raise(error)
        allow(Rollbar).to receive(:error)
      end

      it "returns a bad request response" do
        create_subscription_request

        expect(response).to have_http_status(:bad_request)
      end

      it "raises the error to Rollbar" do
        create_subscription_request

        expect(Rollbar).to have_received(:error).with(
          error,
          "Error creating subscription",
          subscriber_user_id: current_user.id,
          subscribing_user_id: subscribing_user.id
        )
      end
    end

    context "when the create subscription service returns an already exists error" do
      let(:error) { create_subscription_class::AlreadyExistsError.new }

      before do
        allow(create_subscription_instance).to receive(:call).and_raise(error)
        allow(Rollbar).to receive(:error)
      end

      it "returns a conflict response response" do
        create_subscription_request

        expect(response).to have_http_status(:conflict)
      end

      it "does not raise the error to Rollbar" do
        create_subscription_request

        expect(Rollbar).not_to have_received(:error)
      end
    end
  end

  describe "#destroy" do
    subject(:destroy_subscription_request) { delete api_v1_public_subscriptions_path(params: params, as: current_user) }

    let(:params) do
      {
        talent_id: subscribing_user_id
      }
    end

    let(:subscribing_user) { create :user }
    let(:subscribing_user_id) { subscribing_user.uuid }

    let!(:subscription) { create :subscription, subscriber: current_user, user: subscribing_user }

    let(:destroy_subscription_class) { Subscriptions::Destroy }
    let(:destroy_subscription_instance) { instance_double(destroy_subscription_class, call: true) }

    before do
      allow(destroy_subscription_class).to receive(:new).and_return(destroy_subscription_instance)

      stub_const("API::V1::PublicAPI::APIController::INTERNAL_DOMAINS", ["talentprotocol.com"])
      host! "app.talentprotocol.com"
    end

    it "returns a successful response" do
      destroy_subscription_request

      expect(response).to have_http_status(:ok)
    end

    it "initializes and calls the destroy subscription service with the correct params" do
      destroy_subscription_request

      aggregate_failures do
        expect(destroy_subscription_class).to have_received(:new).with(
          subscription: subscription
        )
        expect(destroy_subscription_instance).to have_received(:call)
      end
    end

    context "when the subscribing user does not exist" do
      let(:subscribing_user_id) { -1 }

      it "returns a not found response" do
        destroy_subscription_request

        expect(response).to have_http_status(:not_found)
      end
    end

    context "when the create subscribe service returns a destroy error" do
      let(:error) { destroy_subscription_class::DestroyError.new }

      before do
        allow(destroy_subscription_instance).to receive(:call).and_raise(error)
        allow(Rollbar).to receive(:error)
      end

      it "returns a bad request response response" do
        destroy_subscription_request

        expect(response).to have_http_status(:bad_request)
      end

      it "raises the error to Rollbar" do
        destroy_subscription_request

        expect(Rollbar).to have_received(:error).with(
          error,
          "Error destroying subscription",
          subscription_id: subscription.id,
          subscriber_user_id: current_user.id,
          subscribing_user_id: subscribing_user.id
        )
      end
    end
  end
end
