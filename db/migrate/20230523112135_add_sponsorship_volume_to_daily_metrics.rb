class AddSponsorshipVolumeToDailyMetrics < ActiveRecord::Migration[7.0]
  def change
    add_column :daily_metrics, :total_celo_sponsorship_volume_cusd, :integer
    add_column :daily_metrics, :total_celo_sponsorship_volume_gdollar, :integer
    add_column :daily_metrics, :total_polygon_sponsorship_volume_usdc, :integer
    add_column :daily_metrics, :total_unique_sponsors, :integer
    add_column :daily_metrics, :total_unique_sponsoring, :integer
  end
end
