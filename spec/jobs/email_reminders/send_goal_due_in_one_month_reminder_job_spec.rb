require "rails_helper"

RSpec.describe EmailReminders::SendGoalDueInOneMonthReminderJob, type: :job do
  include ActiveJob::TestHelper

  let(:goal) { create :goal, due_date: 30.days.after, progress: Goal::DOING }
  let!(:user) { create :user, talent: goal.career_goal.talent }

  describe "#perform" do
    it "enqueues a job to send a reminder email to users with goals that are due in one month" do
      expect { described_class.perform_now }
        .to have_enqueued_job
        .exactly(:once)
        .and have_enqueued_job(ActionMailer::MailDeliveryJob)

      expect(enqueued_jobs[0][:args]).to include("send_goal_due_in_one_month_reminder_email")
    end
  end
end
