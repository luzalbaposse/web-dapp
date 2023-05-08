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

    receivers.find_each do |receiver|
      create_notification_service.call(
        recipient: receiver,
        source_id: sender.id,
        type: CareerUpdateCreatedNotification
      )

      send_message_service.call(
        career_update:,
        create_notification: false,
        message: career_update.text,
        receiver:,
        sender:
      )
    end
  end

  private

  def create_notification_service
    @create_notification_service ||= CreateNotification.new
  end

  def send_message_service
    @send_message_service ||= Messages::Send.new
  end
end
