class RenameFollowsToSubscribes < ActiveRecord::Migration[7.0]
  def change
    rename_table :follows, :subscribes
    rename_column :subscribes, :follower_id, :subscriber_id
  end
end
