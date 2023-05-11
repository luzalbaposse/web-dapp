class BroadcastCareerUpdateJob < ApplicationJob
  queue_as :default

  def perform(career_update_id:)
    career_update = CareerUpdate.find(career_update_id)
    sender = career_update.user
    supporters = sender.supporters(including_self: false)
    subscribers = sender.subscribers

    ids = supporters.pluck(:id)
    ids += subscribers.pluck(:id)

    receivers = User.where(id: ids)

    activity = Activities::CareerUpdate.new

    activity.message = career_update.text
    activity.origin_user_id = sender
    activity.target_user_id = supporter
    activity.save!

    ActivityIngestJob.perform_later("career_update", response_body[:career_update][:message], sender.id)
    receivers.find_each do |supporter|
      send_message_service.call(
        message: career_update.text,
        sender: sender,
        receiver: supporter,
        career_update: career_update
      )
    end
  end

  private

  def send_message_service
    @send_message_service ||= Messages::Send.new
  end
end
