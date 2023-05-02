require "rails_helper"

RSpec.describe Subscriptions::RefreshSubscribeBack do
  subject(:refresh_subscribe_back) { described_class.new(subscription: subscription).call }

  let!(:subscription) { create :subscription, user: subscribing_user, subscriber: subscriber_user, subscribed_back_status: initial_subscribed_back_status }

  let(:subscriber_user) { create :user }
  let(:subscribing_user) { create :user }

  let(:initial_subscribed_back_status) { "no_request" }

  context "when there's no subscribe back subscription" do
    let(:initial_subscribed_back_status) { "accepted" }

    it "sets the subscribed_back_status to no_request" do
      refresh_subscribe_back

      expect(subscription.reload.subscribed_back_status).to eq("no_request")
    end
  end

  context "when there's a pending subscribe back subscription" do
    let!(:opposite_subscription) { create :pending_subscription, user: subscriber_user, subscriber: subscribing_user }

    it "sets the subscribed_back_status to pending" do
      refresh_subscribe_back

      expect(subscription.reload.subscribed_back_status).to eq("pending")
      expect(opposite_subscription.reload.subscribed_back_status).to eq("accepted")
    end
  end

  context "when there's a accepted subscribe back subscription" do
    let!(:opposite_subscription) { create :subscription, user: subscriber_user, subscriber: subscribing_user }

    it "sets the subscribed_back_status to accepted" do
      refresh_subscribe_back

      expect(subscription.reload.subscribed_back_status).to eq("accepted")
      expect(opposite_subscription.reload.subscribed_back_status).to eq("accepted")
    end
  end
end
