require "rails_helper"

RSpec.describe EmailReminders::SendGoal15DaysPastDueDateReminderJob, type: :job do
  include ActiveJob::TestHelper

  let(:goal_one) { create :goal, created_at: "2022-01-03", due_date: 15.days.ago, progress: Goal::PLANNED }
  let!(:user_one) { create :user, talent: goal_one.career_goal.talent }

  let(:goal_two) { create :goal, created_at: "2022-01-04", due_date: 15.days.ago, progress: Goal::ABANDONED }
  let!(:user_two) { create :user, talent: goal_two.career_goal.talent }

  let(:goal_three) { create :goal, created_at: "2022-01-04", due_date: 20.days.ago, progress: Goal::PLANNED }
  let!(:user_three) { create :user, talent: goal_three.career_goal.talent }

  describe "#perform" do
    subject(:send_goal_15_days_past_due_date_reminder_email) { described_class.perform_now }

    it "sends a reminder email to users with goals that were due 15 days ago" do
      Sidekiq::Testing.inline! do
        send_goal_15_days_past_due_date_reminder_email

        perform_enqueued_jobs

        deliveries = ActionMailer::Base.deliveries

        aggregate_failures do
          expect(deliveries.count).to eq(1)
          expect(deliveries.first.subject).to eq("Your goal's deadline was 15 days ago!")
        end
      end
    end
  end
end
