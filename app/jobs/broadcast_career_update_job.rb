class BroadcastCareerUpdateJob < ApplicationJob
  queue_as :default

  def perform(career_update_id:)
    career_update = CareerUpdate.find(career_update_id)
    sender = career_update.user
    supporters = sender.supporters(including_self: false)
    subscribers = sender.subscribers

    ids = supporters.pluck(:id)
    ids += subscribers.pluck(:id)
  
    # Exclude career updates from the list of messages
    messages = sender.messages.where.not(type: 'CareerUpdate')
    receivers = User.where(id: ids)
  
    activity = Activities::CareerUpdate.new

    goals = career_update.goals
    goal_names = goals.map(&:name).join(", ")
    activity.message = "#{career_update.text} (Associated goal(s): #{goal_names})"     # Include the associated goal(s) in the message
    activity.origin_user_id = sender.id
    activity.global = true
    activity.save!
  
    Quests::RefreshUserQuests.new(user: sender).call
  
    receivers.find_each do |supporter|
      create_notification_service.call(
        extra_params: {career_update_id: career_update.id},
        recipient: supporter,
        source_id: sender.id,
        type: CareerUpdateCreatedNotification
      )
  
      # Exclude career updates from the list of messages at inbox 
      messages.each do |message|
        send_message_service.call(
          message: message,
          receiver: supporter,
          sender: sender
        )
      end
  
      # career updates are global now
      # supporter.activity_feed.activities << activity
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
