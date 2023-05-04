class AddActivityTypes < ActiveRecord::Migration[7.0]
  def change
    ActivityType.create(activity_type: "career_update")
    ActivityType.create(activity_type: "subscribe")
  end
end
