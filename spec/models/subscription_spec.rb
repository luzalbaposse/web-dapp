require "rails_helper"

RSpec.describe Subscription, type: :model do
  describe "associations" do
    it { is_expected.to belong_to(:user) }
    it { is_expected.to belong_to(:subscriber) }
  end

  describe "#pending?" do
    let!(:subscription) { build :subscription, accepted_at: accepted_at }

    context "when the accepted at is present" do
      let(:accepted_at) { Time.current }

      it "returns false" do
        expect(subscription.pending?).to eq false
      end
    end

    context "when the accepted at is not present" do
      let(:accepted_at) { nil }

      it "returns true" do
        expect(subscription.pending?).to eq true
      end
    end
  end
end
