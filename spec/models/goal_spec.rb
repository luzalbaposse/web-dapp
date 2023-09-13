require "rails_helper"

RSpec.describe Goal, type: :model do
  describe ".due_today" do
    let!(:goal_one) { create :goal, due_date: Date.tomorrow, progress: Goal::PLANNED }
    let!(:goal_two) { create :goal, due_date: Date.current, progress: Goal::PLANNED }
    let!(:goal_three) { create :goal, due_date: Date.yesterday, progress: Goal::PLANNED }
    let!(:goal_four) { create :goal, due_date: Date.current, progress: Goal::DOING }
    let!(:goal_five) { create :goal, due_date: Date.current, progress: Goal::ACCOMPLISHED }
    let!(:goal_six) { create :goal, due_date: Date.current, progress: Goal::ABANDONED }
    let!(:goal_seven) { create :goal, due_date: Date.current, progress: Goal::PAUSED }

    it "returns the goals that are due today and have a 'planned', 'doing' or 'paused' progress" do
      expect(described_class.due_today).to eq([goal_two, goal_four, goal_seven])
    end
  end

  describe ".due_in_one_month" do
    let!(:goal_one) { create :goal, due_date: 30.days.after, progress: Goal::PLANNED }
    let!(:goal_two) { create :goal, due_date: 30.days.after, progress: Goal::DOING }
    let!(:goal_three) { create :goal, due_date: 40.days.after, progress: Goal::DOING }
    let!(:goal_four) { create :goal, due_date: 30.days.after, progress: Goal::ABANDONED }
    let!(:goal_five) { create :goal, due_date: 30.days.after, progress: Goal::ACCOMPLISHED }
    let!(:goal_six) { create :goal, due_date: 30.days.after, progress: Goal::PAUSED }

    it "returns the goals that are due in one month and have a 'planned', 'doing' or 'paused' progress" do
      expect(described_class.due_in_one_month).to eq([goal_one, goal_two, goal_six])
    end
  end

  describe ".due_date_passed_15_days_ago" do
    let!(:goal_one) { create :goal, created_at: "2022-01-04", due_date: 15.days.ago, progress: Goal::PLANNED }
    let!(:goal_two) { create :goal, created_at: "2022-01-04", due_date: 15.days.ago, progress: Goal::DOING }
    let!(:goal_three) { create :goal, created_at: "2022-01-05", due_date: 15.days.ago, progress: Goal::ACCOMPLISHED }

    it "returns the goals that were due 15 days ago" do
      expect(described_class.due_date_passed_15_days_ago).to eq([goal_one, goal_two])
    end
  end

  describe ".due_date_passed_30_days_ago" do
    let!(:goal_one) { create :goal, created_at: "2022-01-04", due_date: 30.days.ago, progress: Goal::PLANNED }
    let!(:goal_two) { create :goal, created_at: "2022-01-04", due_date: 30.days.ago, progress: Goal::DOING }
    let!(:goal_three) { create :goal, created_at: "2022-01-05", due_date: 30.days.ago, progress: Goal::ACCOMPLISHED }

    it "returns the goals that were due 30 days ago" do
      expect(described_class.due_date_passed_30_days_ago).to eq([goal_one, goal_two])
    end
  end
end
