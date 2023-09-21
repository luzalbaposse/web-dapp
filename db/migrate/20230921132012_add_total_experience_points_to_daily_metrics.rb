class AddTotalExperiencePointsToDailyMetrics < ActiveRecord::Migration[7.0]
  def change
    add_column :daily_metrics, :total_experience_points, :integer, default: 0
  end
end
