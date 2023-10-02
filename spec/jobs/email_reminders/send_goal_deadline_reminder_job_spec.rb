require "rails_helper"

RSpec.describe EmailReminders::SendGoalDeadlineReminderJob, type: :job do
  include ActiveJob::TestHelper

  let!(:goal) { create :goal, due_date: Date.current, progress: Goal::DOING, user: user }
  let!(:user) { create :user }

  describe "#perform" do
    subject(:send_goal_deadline_reminder_email) { described_class.perform_now }

    it "enqueues a job to send a reminder email to users with goals due today" do
      expect { send_goal_deadline_reminder_email }
        .to have_enqueued_job
        .exactly(:once)
        .and have_enqueued_job(ActionMailer::MailDeliveryJob)

      expect(enqueued_jobs[0][:args]).to include("send_goal_deadline_reminder_email")
    end
  end
end
