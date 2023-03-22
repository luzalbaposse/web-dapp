require "rails_helper"

RSpec.describe Subscriptions::Create do
  include ActiveJob::TestHelper

  subject(:create_subscription) { described_class.new(subscribing_user: subscribing_user, subscriber_user: subscriber_user).call }

  let(:subscriber_user) { create :user }
  let(:subscribing_user) { create :user }

  it "creates a new subscription" do
    expect { create_subscription }.to change(Subscription, :count).from(0).to(1)
  end

  it "creates two connections" do
    expect { create_subscription }.to change(Connection, :count).from(0).to(2)
  end

  it "creates the subscribe with the correct arguments" do
    created_subscribe = create_subscription

    aggregate_failures do
      expect(created_subscribe.user).to eq(subscribing_user)
      expect(created_subscribe.subscriber).to eq(subscriber_user)
    end
  end

  it "creates the connections with the correct arguments" do
    create_subscription

    subscriber_connection = subscriber_user.connections.last
    subscribing_connection = subscribing_user.connections.last

    aggregate_failures do
      expect(subscriber_connection.user).to eq(subscriber_user)
      expect(subscriber_connection.connected_user).to eq(subscribing_user)
      expect(subscriber_connection.connection_type).to eq("subscriber")

      expect(subscribing_connection.user).to eq(subscribing_user)
      expect(subscribing_connection.connected_user).to eq(subscriber_user)
      expect(subscribing_connection.connection_type).to eq("subscribing")
    end
  end

  context "when the subscription already exists" do
    before { create :subscription, subscriber: subscriber_user, user: subscribing_user }

    it "raises an error" do
      expect { create_subscription }.to raise_error(described_class::AlreadyExistsError)
    end
  end

  context "when there's a stronger connection in place" do
    before do
      talent = create :talent, user: subscribing_user
      token = create :talent_token, talent: talent, deployed: true
      create :talent_supporter, supporter_wallet_id: subscriber_user.wallet_id, talent_contract_id: token.contract_id, amount: "1000000", first_time_bought_at: Date.yesterday
    end

    it "creates two connections" do
      expect { create_subscription }.to change(Connection, :count).from(0).to(2)
    end

    it "creates the connections with the correct arguments" do
      create_subscription

      subscriber_connection = subscriber_user.connections.last
      subscribing_connection = subscribing_user.connections.last

      aggregate_failures do
        expect(subscriber_connection.user).to eq(subscriber_user)
        expect(subscriber_connection.connected_user).to eq(subscribing_user)
        expect(subscriber_connection.connection_type).to eq("supporting")

        expect(subscribing_connection.user).to eq(subscribing_user)
        expect(subscribing_connection.connected_user).to eq(subscriber_user)
        expect(subscribing_connection.connection_type).to eq("supporter")
      end
    end
  end

  context "when the user has more than 2 subscriptions" do
    before do
      create :subscription, user: create(:user), subscriber: subscriber_user
      create :subscription, user: create(:user), subscriber: subscriber_user
    end

    it "enqueues the job to update the watchlist task" do
      Sidekiq::Testing.inline! do
        create_subscription

        job = enqueued_jobs[0]

        aggregate_failures do
          expect(job["job_class"]).to eq("UpdateTasksJob")
          expect(job["arguments"][0]["type"]).to eq("Tasks::Watchlist")
          expect(job["arguments"][0]["user_id"]).to eq(subscriber_user.id)
        end
      end
    end
  end
end
