class UserProductAnnouncement < ApplicationRecord
  belongs_to :product_announcement
  belongs_to :user

  validates :product_announcement, uniqueness: {scope: :user}
end
