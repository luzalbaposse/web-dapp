require "discord/accomplished_goal_notification"

class Discord::SendAccomplishedGoalNotificationJob < ApplicationJob
  queue_as :default

  def perform(goal_id)
    goal = Goal.find_by(id: goal_id)
    return unless goal

    Discord::AccomplishedGoalNotification.new(goal:).call
  end
end
