class AddTotalUsersWithActiveGoalsToDailyMetrics < ActiveRecord::Migration[7.0]
  def change
    add_column :daily_metrics, :total_users_with_active_goals, :integer
  end
end
