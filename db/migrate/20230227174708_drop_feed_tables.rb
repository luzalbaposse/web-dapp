class DropFeedTables < ActiveRecord::Migration[7.0]
  def change
    drop_table :comments
    drop_table :feed_posts
    drop_table :posts
    drop_table :feeds
  end
end
