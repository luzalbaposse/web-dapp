class AddMessageMetricsToDailyMetrics < ActiveRecord::Migration[7.0]
  def change
    add_column :daily_metrics, :total_users_that_received_messages, :integer
    add_column :daily_metrics, :total_users_that_sent_messages, :integer
    add_column :daily_metrics, :total_messages_read, :integer
    add_column :daily_metrics, :total_messages, :integer
  end
end
