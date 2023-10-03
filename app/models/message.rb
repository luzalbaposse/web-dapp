class Message < ApplicationRecord
  has_encrypted :text

  # TODO make it mandatory after running migrations
  belongs_to :chat, optional: true
class Message < ApplicationRecord
  belongs_to :career_update, optional: true

  belongs_to :sender, class_name: "User"
  belongs_to :receiver, class_name: "User"
  attribute :type, :string # This will allow us to filter messages by type
  scope :unread, -> { where(is_read: false) }

  def sender_chat_id
    [sender_id, receiver_id].join("")
  end

  def receiver_chat_id
    [receiver_id, sender_id].join("")
  end

  def to_json
    {
      id: id,
      sender_id: sender.uuid,
      receiver_id: receiver.uuid,
      created_at: created_at,
      updated_at: updated_at,
      text: text,
      from_career_update: career_update.present?
    }
  end
end
