class Chat < ApplicationRecord
  has_encrypted :last_message_text

  # User who initiated the conversation
  belongs_to :sender, class_name: "User"
  # User that received the first message
  belongs_to :receiver, class_name: "User"

  has_many :messages

  validates :sender_id, :receiver_id, :last_message_at, presence: true
  validates :sender_id, uniqueness: {scope: :receiver_id}

  def self.between(sender, receiver)
    Chat.where(
      "(sender_id = :sender_id AND receiver_id = :receiver_id) OR (sender_id = :receiver_id AND receiver_id = :sender_id)",
      sender_id: sender.id,
      receiver_id: receiver.id
    ).take
  end

  def self.of_user(user)
    Chat.where(
      "(sender_id = :user_id OR receiver_id = :user_id)",
      user_id: user.id
    )
  end

  def self.with_connections(user, unread = false)
    receiver_chats = Chat.where(receiver: user, sender: user.connected_users)
    receiver_chats = receiver_chats.where("receiver_unread_messages_count > 0") if unread

    sender_chats = Chat.where(sender: user, receiver: user.connected_users)
    sender_chats = sender_chats.where("sender_unread_messages_count > 0") if unread

    receiver_chats.or(sender_chats)
  end

  def unread_messages_of(user)
    return sender_unread_messages_count if sender_id == user.id

    receiver_unread_messages_count
  end

  def receiver_of(user)
    return receiver if sender_id == user.id

    sender
  end

  def mark_as_read!(user)
    return update!(sender_unread_messages_count: 0) if sender_id == user.id

    update!(receiver_unread_messages_count: 0)
  end
end
