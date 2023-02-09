class AddPageViewsToDailyMetrics < ActiveRecord::Migration[7.0]
  def change
    add_column :daily_metrics, :daily_page_visitors, :jsonb, default: {}
  end
end
