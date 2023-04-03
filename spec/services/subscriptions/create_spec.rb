require "rails_helper"

RSpec.describe Subscriptions::Create do
  include ActiveJob::TestHelper

  subject(:create_subscription) { described_class.new(subscribing_user: subscribing_user, subscriber_user: subscriber_user).call }

  let(:subscriber_user) { create :user }
  let(:subscribing_user) { create :user }

  let(:create_notification_class) { CreateNotification }
  let(:create_notification_instance) { instance_double(create_notification_class, call: true) }

  before do
    allow(create_notification_class).to receive(:new).and_return(create_notification_instance)
  end

  it "creates a new active subscription" do
    expect { create_subscription }.to change(PendingSubscription, :count).from(0).to(1)
  end

  it "creates the subscription with the correct arguments" do
    created_subscribe = create_subscription

    aggregate_failures do
      expect(created_subscribe.user).to eq(subscribing_user)
      expect(created_subscribe.subscriber).to eq(subscriber_user)
    end
  end

  it "initializes and calls the create notification service" do
    create_subscription

    expect(create_notification_class).to have_received(:new)
    expect(create_notification_instance).to have_received(:call).with(
      recipient: subscribing_user,
      type: SubscriptionRequestReceivedNotification,
      source_id: subscriber_user.id
    )
  end

  context "when the subscription already exists" do
    before { create :subscription, subscriber: subscriber_user, user: subscribing_user }

    it "raises an error" do
      expect { create_subscription }.to raise_error(described_class::AlreadyExistsError)
    end
  end
end
