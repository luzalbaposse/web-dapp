class ActivityIngestJob < ApplicationJob
  queue_as :default

  def perform(activity_type, content, origin_user_id, target_user_id = nil)
    activity_base = module_type(activity_type)

    activity_base.create(
      content: activity_base.generate_content(origin_user_id, target_user_id) || content,
      origin_user_id: origin_user_id,
      target_user_id: target_user_id
    )
  end

  private

  def module_type(activity_type)
    case activity_type
    when "token_launch"
      Activities::TokenLaunch
    when "career_update"
      Activities::CareerUpdate
    when "profile_complete"
      Activities::ProfileComplete
    when "stake"
      Activities::Stake
    when "sponsor"
      Activities::Sponsor
    when "subscribe"
      Activities::Subscribe
    end
  end
end
