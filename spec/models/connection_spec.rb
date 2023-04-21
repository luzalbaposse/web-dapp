require "rails_helper"

RSpec.describe Connection, type: :model do
  subject { build :connection, user: build(:user), connected_user: build(:user) }

  describe "associations" do
    it { is_expected.to belong_to(:user) }
    it { is_expected.to belong_to(:connected_user) }
  end

  describe "validations" do
    it { is_expected.to validate_presence_of(:connected_at) }
    it { is_expected.to validate_uniqueness_of(:user_id).scoped_to(:connected_user_id) }
  end

  describe "#refresh_connection!" do
    let(:user) { create :user }
    let(:connected_user) { create :user }
    let!(:connection) { create :connection, user: user, connected_user: connected_user, connected_at: Date.yesterday }

    context "when there is no connection between the users" do
      it "deletes the existing connection" do
        expect { connection.refresh_connection! }.to change(Connection, :count).from(1).to(0)
      end
    end

    context "when the user is subscribing the connected user" do
      before do
        create :subscription, user: connected_user, subscriber: user
      end

      it "updates the connection type to subscribing" do
        updated_connection = connection.refresh_connection!

        expect(updated_connection.connection_type).to eq "subscribing"
      end
    end

    context "when the user is being subscribed by the connected user" do
      before do
        create :subscription, user: user, subscriber: connected_user
      end

      it "updates the connection type to subscriber" do
        updated_connection = connection.refresh_connection!

        expect(updated_connection.connection_type).to eq "subscriber"
      end
    end

    context "when the user is staking in the connected user" do
      before do
        talent = create :talent, user: connected_user
        token = create :talent_token, talent: talent, deployed: true
        create :talent_supporter, supporter_wallet_id: user.wallet_id, talent_contract_id: token.contract_id, amount: "1000000", first_time_bought_at: Date.yesterday
      end

      it "updates the connection type to staking" do
        updated_connection = connection.refresh_connection!

        expect(updated_connection.connection_type).to eq "staking"
      end
    end

    context "when the user is supported the connected user" do
      before do
        talent = create :talent, user: user
        token = create :talent_token, talent: talent, deployed: true
        create :talent_supporter, supporter_wallet_id: connected_user.wallet_id, talent_contract_id: token.contract_id, amount: "1000000", first_time_bought_at: Date.yesterday
      end

      it "updates the connection type to staker" do
        updated_connection = connection.refresh_connection!

        expect(updated_connection.connection_type).to eq "staker"
      end
    end

    context "when the users are supported by each other" do
      before do
        talent_one = create :talent, user: user
        token_one = create :talent_token, talent: talent_one, deployed: true

        talent_two = create :talent, user: connected_user
        token_two = create :talent_token, talent: talent_two, deployed: true

        create :talent_supporter, supporter_wallet_id: connected_user.wallet_id, talent_contract_id: token_one.contract_id, amount: "1000000", first_time_bought_at: Date.yesterday
        create :talent_supporter, supporter_wallet_id: user.wallet_id, talent_contract_id: token_two.contract_id, amount: "1000000", first_time_bought_at: Date.yesterday
      end

      it "updates the connection type to mutual stake" do
        updated_connection = connection.refresh_connection!

        expect(updated_connection.connection_type).to eq "mutual_stake"
      end
    end

    context "when the users subscribe each other" do
      before do
        create :subscription, user: user, subscriber: connected_user
        create :subscription, user: connected_user, subscriber: user
      end

      it "updates the connection type to mutual subscription" do
        updated_connection = connection.refresh_connection!

        expect(updated_connection.connection_type).to eq "mutual_subscription"
      end
    end

    context "when the user sponsors the connected user" do
      before do
        create :sponsorship, sponsor: user.wallet_id, talent: connected_user.wallet_id, claimed_at: Time.current
      end

      it "updates the connection type to sponsor" do
        updated_connection = connection.refresh_connection!

        expect(updated_connection.connection_type).to eq "sponsor"
      end
    end

    context "when the user is sponsored by the connected user" do
      before do
        create :sponsorship, sponsor: connected_user.wallet_id, talent: user.wallet_id, claimed_at: Time.current
      end

      it "updates the connection type to sponsored" do
        updated_connection = connection.refresh_connection!

        expect(updated_connection.connection_type).to eq "sponsored"
      end
    end
  end
end
