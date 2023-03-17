class BroadcastCareerUpdateJob < ApplicationJob
  queue_as :default

  def perform(career_update_id)
    career_update = CareerUpdate.find(career_update_id)
    sender = career_update.user
    supporters = sender.supporters(including_self: false)
    followers = sender.followers

    ids = supporters.pluck(:id)
    ids += followers.pluck(:id)

    receivers = User.where(id: ids)

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