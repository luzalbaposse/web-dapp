class ProductAnnouncement < ApplicationRecord
  include ::CareerGoalImageUploader::Attachment(:image)

  has_many :user_product_announcements, dependent: :destroy

  validates :content, presence: true
  validates :title, presence: true

  def mark_as_read_for!(user)
    user_product_announcements.find_or_create_by(user:).update!(read_at: Time.current)
  end

  def read?(user)
    user_product_announcements.find_by(user:)&.read_at&.present? || false
  end
end
