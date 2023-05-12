class AddSignupsToDailyMetrics < ActiveRecord::Migration[7.0]
  def change
    add_column :daily_metrics, :total_linkedin_signups, :integer
    add_column :daily_metrics, :total_email_signups, :integer
  end
end
