class ActivityFeedActivity < ApplicationRecord
  belongs_to :activity_feed
  belongs_to :activity
end
