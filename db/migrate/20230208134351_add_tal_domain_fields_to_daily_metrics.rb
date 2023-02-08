class AddTalDomainFieldsToDailyMetrics < ActiveRecord::Migration[7.0]
  def change
    add_column :daily_metrics, :total_claimed_domains, :integer
    add_column :daily_metrics, :total_tal_subdomain_transactions, :integer
  end
end
