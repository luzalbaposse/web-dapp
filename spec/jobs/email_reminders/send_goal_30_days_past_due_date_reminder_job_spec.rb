require "rails_helper"

RSpec.describe EmailReminders::SendGoal30DaysPastDueDateReminderJob, type: :job do
  include ActiveJob::TestHelper

  let(:goal_one) { create :goal, created_at: "2022-01-03", due_date: 30.days.ago, progress: Goal::PLANNED }
  let!(:user_one) { create :user, talent: goal_one.career_goal.talent }

  let(:goal_two) { create :goal, created_at: "2022-01-04", due_date: 30.days.ago, progress: Goal::ABANDONED }
  let!(:user_two) { create :user, talent: goal_two.career_goal.talent }

  let(:goal_three) { create :goal, created_at: "2022-01-04", due_date: 40.days.ago, progress: Goal::PLANNED }
  let!(:user_three) { create :user, talent: goal_three.career_goal.talent }

  describe "#perform" do
    subject(:send_goal_30_days_past_due_date_reminder_email) { described_class.perform_now }

    it "sends a reminder email to users with goals that were due 30 days ago" do
      Sidekiq::Testing.inline! do
        send_goal_30_days_past_due_date_reminder_email

        perform_enqueued_jobs

        deliveries = ActionMailer::Base.deliveries
        goal_one.reload

        aggregate_failures do
          expect(goal_one.progress).to eq(Goal::ABANDONED)

          expect(deliveries.count).to eq(1)
          expect(deliveries.first.subject).to eq("Your Goal's Journey: Past Its Due Date, What's Next?")
        end
      end
    end
  end
end
