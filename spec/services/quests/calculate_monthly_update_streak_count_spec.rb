require "rails_helper"

RSpec.describe Quests::CalculateMonthlyUpdateStreakCount do
  let(:user) { create :user }

  subject(:calculate_monthly_update_streak_count) { described_class.new(user:) }

  describe "#call" do
    context "when the user has created a career update this month" do
      before do
        create :career_update, created_at: Date.today, user: user
        create :career_update, created_at: 1.months.ago, user: user
        create :career_update, created_at: 2.month.ago, user: user
        create :career_update, created_at: 4.months.ago, user: user
        create :career_update, created_at: 5.month.ago, user: user
        create :career_update, created_at: 6.months.ago, user: user
      end

      it "returns the number of consecutive months that the user has created a career update" do
        expect(subject.call).to eq(3)
      end
    end

    context "when the user has not created a career update this month" do
      before do
        create :career_update, created_at: 1.month.ago, user: user
        create :career_update, created_at: 2.months.ago, user: user
      end

      it "returns 0" do
        expect(subject.call).to eq(0)
      end
    end

    context "when the user has no career updates" do
      it "returns 0" do
        expect(subject.call).to eq(0)
      end
    end
  end
end
