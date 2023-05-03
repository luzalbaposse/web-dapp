require "rails_helper"

RSpec.describe Subscriptions::Destroy do
  include ActiveJob::TestHelper

  subject(:delete_subscribe) { described_class.new(subscription: subscription).call }

  let!(:subscription) { create :subscription, user: subscribing_user, subscriber: subscriber_user }

  let(:subscriber_user) { create :user }
  let(:subscribing_user) { create :user }

  let(:refresh_subscribe_back_class) { Subscriptions::RefreshSubscribeBack }
  let(:refresh_subscribe_back_instance) { instance_double(refresh_subscribe_back_class, call: true) }

  before do
    allow(refresh_subscribe_back_class).to receive(:new).and_return(refresh_subscribe_back_instance)
  end

  it "deletes the subscription" do
    expect { delete_subscribe }.to change(Subscription, :count).from(1).to(0)
  end

  it "initializes and calls the refresh subscribe back service" do
    delete_subscribe

    expect(refresh_subscribe_back_class).to have_received(:new).with(
      subscription: subscription
    )
    expect(refresh_subscribe_back_instance).to have_received(:call)
  end

  context "when there are connections related with the subscription" do
    before do
      create :connection, user: subscribing_user, connected_user: subscriber_user, connection_type: "subscriber"
      create :connection, user: subscriber_user, connected_user: subscribing_user, connection_type: "subscribing"
    end

    it "deletes the connections" do
      expect { delete_subscribe }.to change(Connection, :count).from(2).to(0)
    end
  end

  context "when there are connections related with the subscription" do
    before do
      create :connection, user: subscribing_user, connected_user: subscriber_user, connection_type: "subscriber"
      create :connection, user: subscriber_user, connected_user: subscribing_user, connection_type: "subscribing"
    end

    it "deletes the connections" do
      expect { delete_subscribe }.to change(Connection, :count).from(2).to(0)
    end
  end

  context "when there is a stronger connection between the users" do
    before do
      talent = create :talent, user: subscribing_user
      token = create :talent_token, talent: talent, deployed: true
      create(
        :talent_supporter,
        supporter_wallet_id: subscriber_user.wallet_id,
        talent_contract_id: token.contract_id,
        amount: "1000000",
        first_time_bought_at: Date.yesterday
      )

      create :connection, user: subscribing_user, connected_user: subscriber_user, connection_type: "staker"
      create :connection, user: subscriber_user, connected_user: subscribing_user, connection_type: "staking"
    end

    it "deletes the connections" do
      expect { delete_subscribe }.not_to change(Connection, :count)
    end
  end
end
