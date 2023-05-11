class AddEmailFieldsToDailyMetrics < ActiveRecord::Migration[7.0]
  def change
    add_column :daily_metrics, :total_verified_users, :integer
    add_column :daily_metrics, :total_emails_sent_by_app, :integer
    add_column :daily_metrics, :total_emails_delivered, :integer
    add_column :daily_metrics, :total_emails_opened, :integer
    add_column :daily_metrics, :total_app_notifications, :integer
    add_column :daily_metrics, :total_app_read_notifications, :integer
    add_column :daily_metrics, :daily_join_pages_visitors, :integer
  end
end
