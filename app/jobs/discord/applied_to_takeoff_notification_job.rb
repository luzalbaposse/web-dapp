require "discord/applied_to_takeoff_notification"

class Discord::AppliedToTakeoffNotificationJob < ApplicationJob
  queue_as :default

  def perform(goal_id)
    goal = Goal.find_by(id: goal_id)
    return unless goal

    Discord::AppliedToTakeoffNotification.new(goal:).call
  end
end
