class AddProfileCompletedAtToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :profile_completed_at, :timestamp
  end
end
