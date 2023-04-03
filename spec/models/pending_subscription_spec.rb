require "rails_helper"

RSpec.describe PendingSubscription, type: :model do
  describe "default scope" do
    let!(:subscription_one) { create :subscription, accepted_at: Time.current }
    let!(:subscription_two) { create :subscription, accepted_at: nil }

    it "returns only active subscriptions" do
      expect(PendingSubscription.all.pluck(:id)).to match_array [subscription_two.id]
    end
  end

  describe "#pending?" do
    it "returns true" do
      expect(subject.pending?).to eq true
    end
  end
end
