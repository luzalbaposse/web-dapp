class AddTotalUsersCreatedToDailyMetrics < ActiveRecord::Migration[7.0]
  def change
    add_column :daily_metrics, :total_users_created, :integer, default: 0
  end
end
