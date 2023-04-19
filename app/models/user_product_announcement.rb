class UserProductAnnouncement < ApplicationRecord
  belongs_to :user
  belongs_to :product_announcement
end
