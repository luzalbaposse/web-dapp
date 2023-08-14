require "rails_helper"

RSpec.describe Subscriptions::Accept do
  include ActiveJob::TestHelper

  subject(:accept_subscription) { described_class.new(subscription: subscription).call }

  let(:subscription) { create :subscription, user: subscribing_user, subscriber: subscriber_user, accepted_at: accepted_at }
  let(:subscribing_user) { create :user }
  let(:subscriber_user) { create :user }
  let(:accepted_at) { nil }

  let(:create_notification_class) { CreateNotification }
  let(:create_notification_instance) { instance_double(create_notification_class, call: true) }

  let(:refresh_subscribe_back_class) { Subscriptions::RefreshSubscribeBack }
  let(:refresh_subscribe_back_instance) { instance_double(refresh_subscribe_back_class, call: true) }

  before do
    allow(create_notification_class).to receive(:new).and_return(create_notification_instance)
    allow(refresh_subscribe_back_class).to receive(:new).and_return(refresh_subscribe_back_instance)
  end

  it "accepts the subscription" do
    freeze_time do
      accept_subscription

      expect(subscription.reload.accepted_at).to eq(Time.current)
    end
  end

  it "creates two connections" do
    expect { accept_subscription }.to change(Connection, :count).from(0).to(2)
  end

  it "creates the subscribe with the correct arguments" do
    created_subscribe = accept_subscription

    aggregate_failures do
      expect(created_subscribe.user).to eq(subscribing_user)
      expect(created_subscribe.subscriber).to eq(subscriber_user)
    end
  end

  it "creates the connections with the correct arguments" do
    accept_subscription

    subscribing_connection = subscriber_user.connections.last
    subscriber_connection = subscribing_user.connections.last

    aggregate_failures do
      expect(subscriber_connection.user).to eq(subscribing_user)
      expect(subscriber_connection.connected_user).to eq(subscriber_user)
      expect(subscriber_connection.connection_type).to eq("subscriber")

      expect(subscribing_connection.user).to eq(subscriber_user)
      expect(subscribing_connection.connected_user).to eq(subscribing_user)
      expect(subscribing_connection.connection_type).to eq("subscribing")
    end
  end

  it "initializes and calls the create notification service" do
    accept_subscription

    expect(create_notification_class).to have_received(:new)
    expect(create_notification_instance).to have_received(:call).with(
      recipient: subscriber_user,
      type: SubscriptionAcceptedNotification,
      source_id: subscribing_user.id
    )
  end

  it "initializes and calls the refresh subscribe back service" do
    accept_subscription

    expect(refresh_subscribe_back_class).to have_received(:new).with(
      subscription: subscription
    )
    expect(refresh_subscribe_back_instance).to have_received(:call)
  end

  it "enqueues two jobs to refresh user quests" do
    Sidekiq::Testing.inline! do
      accept_subscription

      jobs = enqueued_jobs.select { |j| j["job_class"] == "Quests::RefreshUserQuestsJob" }

      aggregate_failures do
        expect([jobs[0]["arguments"][0], jobs[1]["arguments"][0]]).to match_array([subscriber_user.id, subscribing_user.id])
      end
    end
  end

  context "when the subscription is already accepted" do
    let(:accepted_at) { Date.yesterday }

    it "raises an error" do
      expect { accept_subscription }.to raise_error(described_class::AlreadyAcceptedError)
    end
  end

  context "when there's a stronger connection in place" do
    before do
      talent = create :talent, user: subscribing_user
      token = create :talent_token, talent: talent, deployed: true
      create :talent_supporter, supporter_wallet_id: subscriber_user.wallet_id, talent_contract_id: token.contract_id, amount: "1000000", first_time_bought_at: Date.yesterday
    end

    it "creates two connections" do
      expect { accept_subscription }.to change(Connection, :count).from(0).to(2)
    end

    it "creates the connections with the correct arguments" do
      accept_subscription

      subscriber_connection = subscriber_user.connections.last
      subscribing_connection = subscribing_user.connections.last

      aggregate_failures do
        expect(subscriber_connection.user).to eq(subscriber_user)
        expect(subscriber_connection.connected_user).to eq(subscribing_user)
        expect(subscriber_connection.connection_type).to eq("staking")

        expect(subscribing_connection.user).to eq(subscribing_user)
        expect(subscribing_connection.connected_user).to eq(subscriber_user)
        expect(subscribing_connection.connection_type).to eq("staker")
      end
    end
  end
end
