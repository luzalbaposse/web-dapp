module EmailReminders
  class SendGoalDueInOneMonthReminderJob < ApplicationJob
    queue_as :default

    def perform
      Goal.due_in_one_month.find_each do |goal|
        UserMailer
          .with(goal: goal, user: goal.user)
          .send_goal_due_in_one_month_reminder_email
          .deliver_later
      end
    end
  end
end
