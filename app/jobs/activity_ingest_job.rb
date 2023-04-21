class ActivityIngestJob < ApplicationJob
  queue_as :default

  def perform(activity_type_string, content, origin_user, target_user)
    activity_type = ActivityType.find_by(activity_type: activity_type_string)
    Activity.create(activity_type: activity_type, content: content, origin_user: origin_user, target_user: target_user)
  end
end
