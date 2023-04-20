class AddNewFieldsToDailyMetrics < ActiveRecord::Migration[7.0]
  def change
    add_column :daily_metrics, :total_polygon_sponsorship_transactions, :integer
    add_column :daily_metrics, :total_celo_sponsorship_transactions, :integer
    add_column :daily_metrics, :total_users_with_subscribers, :integer
    add_column :daily_metrics, :total_users_subscribing, :integer
    add_column :daily_metrics, :total_users_with_career_updates, :integer
    add_column :daily_metrics, :total_career_updates, :integer
    add_column :daily_metrics, :daily_conversion_rate, :decimal, precision: 10, scale: 4, default: 0
    rename_column :daily_metrics, :total_polygon_token_transactions, :total_polygon_stake_transactions
    rename_column :daily_metrics, :total_celo_token_transactions, :total_celo_stake_transactions
    add_column :daily_metrics, :total_users_with_three_or_more_subscribers, :integer
    add_column :daily_metrics, :total_users_subscribing_three_or_more, :integer
  end
end
