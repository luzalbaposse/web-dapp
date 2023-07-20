class ActivityFeed < ApplicationRecord
  belongs_to :user
  has_many :activity_feed_activities, dependent: :destroy
  has_many :activities, through: :activity_feed_activities

  def all_activities
    global_activities = Activity
      .where.not(type: "Activities::ProfileComplete")
      .where(global: true)
      .to_sql
    user_activities = activities.to_sql

    # Merge global and user-specific activities using UNION
    Activity.from("(#{global_activities} UNION #{user_activities}) AS activities")
  end

  def activities_of_types(types)
    global_activities = Activity.where(global: true).where(type: types).to_sql
    user_activities = activities.where(type: types).to_sql

    # Merge global and user-specific activities using UNION
    Activity.from("(#{global_activities} UNION #{user_activities}) AS activities")
  end
end
