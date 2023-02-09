class AddOnboardingMetricsToDailyMetrics < ActiveRecord::Migration[7.0]
  def change
    add_column :daily_metrics, :total_onboarding_metrics, :jsonb, default: {}
  end
end
