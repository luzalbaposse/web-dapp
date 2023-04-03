require "rails_helper"

RSpec.describe ActiveSubscription, type: :model do
  describe "default scope" do
    let!(:subscription_one) { create :subscription, accepted_at: Time.current }
    let!(:subscription_two) { create :subscription, accepted_at: nil }

    it "returns only active subscriptions" do
      expect(ActiveSubscription.all.pluck(:id)).to match_array [subscription_one.id]
    end
  end

  describe "#pending?" do
    it "returns false" do
      expect(subject.pending?).to eq false
    end
  end
end
