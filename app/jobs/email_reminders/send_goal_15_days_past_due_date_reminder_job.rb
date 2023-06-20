module EmailReminders
  class SendGoal15DaysPastDueDateReminderJob < ApplicationJob
    queue_as :default

    def perform
      Goal.due_date_passed_15_days_ago.find_each do |goal|
        UserMailer
          .with(goal: goal, user: goal.career_goal.talent.user)
          .send_goal_15_days_past_due_date_reminder_email
          .deliver_later
      end
    end
  end
end
