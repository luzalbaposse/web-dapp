class CreateActivityFeeds < ActiveRecord::Migration[7.0]
  def change
    create_table :activity_feeds do |t|
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
