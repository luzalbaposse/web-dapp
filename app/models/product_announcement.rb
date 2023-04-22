class ProductAnnouncement < ApplicationRecord
  include ::CareerGoalImageUploader::Attachment(:image)

  has_many :user_product_announcements, dependent: :destroy

  validates :content, presence: true
  validates :title, presence: true
end
