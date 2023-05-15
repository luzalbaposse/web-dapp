class ActivityIngestJob < ApplicationJob
  queue_as :default

  def perform(activity_type, content, origin_user_id, target_user_id = nil)
    activity_base = ("Activities::" + activity_type.camelize).constantize

    activity = activity_base.new

    activity.message = activity_base.generate_content(origin_user_id, target_user_id) || content
    activity.origin_user_id = origin_user_id
    activity.target_user_id = target_user_id
    activity.global = activity_base.default_global_scope
    activity.save!
  end
end
