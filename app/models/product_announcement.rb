class ProductAnnouncement < ApplicationRecord
  include ::CareerGoalImageUploader::Attachment(:image)

  validates :content, presence: true
  validates :title, presence: true
end
