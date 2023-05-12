class CreateActivityFeedActivities < ActiveRecord::Migration[7.0]
  def change
    create_table :activity_feed_activities do |t|
      t.references :activity_feed, null: false, foreign_key: true
      t.references :activity, null: false, foreign_key: true

      t.timestamps
    end
  end
end
