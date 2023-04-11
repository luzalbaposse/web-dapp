require "rails_helper"

RSpec.describe Sponsorship, type: :model do
  subject { build :sponsorship }

  describe "validations" do
    it { is_expected.to validate_presence_of(:chain_id) }
    it { is_expected.to validate_presence_of(:sponsor) }
    it { is_expected.to validate_presence_of(:talent) }
    it { is_expected.to validate_presence_of(:amount) }
    it { is_expected.to validate_presence_of(:symbol) }
    it { is_expected.to validate_presence_of(:token) }
  end

  describe "#status" do
    let!(:sponsorship) { create :sponsorship, claimed_at: claimed_at, revoked_at: revoked_at }
    let(:revoked_at) { nil }
    let(:claimed_at) { nil }

    context "when the claimed at is present" do
      let(:claimed_at) { Time.current }

      it "returns claimed" do
        expect(sponsorship.status).to eq "claimed"
      end
    end

    context "when the revoked at is present" do
      let(:revoked_at) { Time.current }

      it "returns revoked" do
        expect(sponsorship.status).to eq "revoked"
      end
    end

    context "when the claimed at and revoked at are not present" do
      let(:claimed_at) { nil }
      let(:revoked_at) { nil }

      it "returns revoked" do
        expect(sponsorship.status).to eq "pending"
      end
    end
  end

  describe "#sponsor_user" do
    let!(:sponsorship) { create :sponsorship, sponsor: wallet_id }
    let!(:user) { create :user }
    let(:wallet_id) { user.wallet_id }

    context "when there is a user with the sponsor wallet" do
      it "returns the user" do
        expect(sponsorship.sponsor_user).to eq user
      end
    end

    context "when there is no user with the sponsor wallet" do
      let(:wallet_id) { SecureRandom.hex }

      it "returns nil" do
        expect(sponsorship.sponsor_user).to eq nil
      end
    end
  end

  describe "#talent_user" do
    let!(:sponsorship) { create :sponsorship, talent: wallet_id }
    let!(:user) { create :user }
    let(:wallet_id) { user.wallet_id }

    context "when there is a user with the sponsor wallet" do
      it "returns the user" do
        expect(sponsorship.talent_user).to eq user
      end
    end

    context "when there is no user with the sponsor wallet" do
      let(:wallet_id) { SecureRandom.hex }

      it "returns nil" do
        expect(sponsorship.talent_user).to eq nil
      end
    end
  end
end
