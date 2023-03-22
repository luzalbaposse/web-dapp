require "rails_helper"

RSpec.describe Subscribes::Destroy do
  include ActiveJob::TestHelper

  subject(:delete_subscribe) { described_class.new(subscribe: subscribe).call }

  let!(:subscribe) { create :subscribe, user: subscribing_user, subscriber: subscriber_user }

  let(:subscriber_user) { create :user }
  let(:subscribing_user) { create :user }

  it "deletes the follow" do
    expect { delete_subscribe }.to change(Subscribe, :count).from(1).to(0)
  end

  context "when there are connections related with the follow" do
    before do
      create :connection, user: subscribing_user, connected_user: subscriber_user, connection_type: "subscriber"
      create :connection, user: subscriber_user, connected_user: subscribing_user, connection_type: "subscribing"
    end

    it "deletes the connections" do
      expect { delete_subscribe }.to change(Connection, :count).from(2).to(0)
    end
  end

  context "when there are connections related with the follow" do
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

      create :connection, user: subscribing_user, connected_user: subscriber_user, connection_type: "supporter"
      create :connection, user: subscriber_user, connected_user: subscribing_user, connection_type: "supporting"
    end

    it "deletes the connections" do
      expect { delete_subscribe }.not_to change(Connection, :count)
    end
  end
end
