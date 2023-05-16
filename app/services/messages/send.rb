module Messages
  class Send
    def call(
      message:,
      receiver:,
      sender:,
      career_update: nil,
      create_notification: true,
      sent_to_supporters: false
    )
      return if sender.id == receiver.id

      chat = upsert_chat(sender, receiver, message)
      message = create_message(chat, sender, receiver, message, sent_to_supporters, career_update)
      create_notification_for(receiver, sender) if create_notification
      broadcast(chat, message)

      message
    end

    private

    attr_reader :sender, :receiver, :message

    def create_message(chat, sender, receiver, message, sent_to_supporters, career_update)
      ActiveRecord::Base.transaction do
        Message.create!(
          chat: chat,
          sender: sender,
          receiver: receiver,
          text: message,
          sent_to_supporters: sent_to_supporters,
          career_update: career_update
        )
      end
    end

    def upsert_chat(sender, receiver, message)
      chat = Chat.between(sender, receiver)

      chat ||= Chat.new(sender: sender, receiver: receiver)

      if chat.sender_id == sender.id
        chat.receiver_unread_messages_count += 1
      else
        chat.sender_unread_messages_count += 1
      end

      chat.update!(last_message_at: Time.zone.now, last_message_text: message)

      chat
    end

    def create_notification_for(receiver, sender)
      CreateNotification.new.call(
        recipient: receiver,
        type: MessageReceivedNotification,
        extra_params: {sender_id: sender.id}
      )
    end

    def create_notification_service
      @create_notification_service ||= CreateNotification.new
    end

    def broadcast(chat, message)
      ActionCable.server.broadcast("message_channel_#{chat.id}", {message: message.to_json})
    end
  end
end
