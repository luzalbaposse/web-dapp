class Activity < ApplicationRecord
  belongs_to :origin_user, class_name: "User"
  belongs_to :target_user, class_name: "User", optional: true

  has_many :activity_feed_activities
  has_many :activity_feeds, through: :activity_feed_activities
end
