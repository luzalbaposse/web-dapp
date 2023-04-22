class ProductAnnouncement < ApplicationRecord
  include ::CareerGoalImageUploader::Attachment(:image)

  has_many :user_product_announcements, dependent: :destroy

  validates :content, presence: true
  validates :title, presence: true

  def read?(user)
    user_product_announcements.find_by(user:)&.read_at&.present? || false
  end
end
