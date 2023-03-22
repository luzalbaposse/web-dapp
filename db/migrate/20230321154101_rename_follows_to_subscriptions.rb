class RenameFollowsToSubscriptions < ActiveRecord::Migration[7.0]
  def change
    rename_table :follows, :subscriptions
    rename_column :subscriptions, :follower_id, :subscriber_id
  end
end
