class ActivityFeed < ApplicationRecord
  belongs_to :user
  has_many :activity_feed_activities
  has_many :activities, through: :activity_feed_activities

  def all_activities
    # Activity.where(global: true).or(Activity.joins(:activity_feed_activities).where(activity_feed_activities: {activity_feed_id: id}))

    global_activities = Activity.where(global: true).to_sql
    user_activities = activities.to_sql

    # Merge global and user-specific activities using UNION
    Activity.from("(#{global_activities} UNION #{user_activities}) AS activities")
  end
end
