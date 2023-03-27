class AddNewMetricsToDailyMetrics < ActiveRecord::Migration[7.0]
  def change
    add_column :daily_metrics, :total_stables_stored_polygon, :string
    add_column :daily_metrics, :total_stables_stored_celo, :string
    add_column :daily_metrics, :tal_rewards_given_polygon, :string
    add_column :daily_metrics, :tal_rewards_given_celo, :string
  end
end
