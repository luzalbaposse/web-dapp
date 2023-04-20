require "metrics/smart_contract"
require "metrics/app"
require "google_drive/upload_metrics"

class DailyMetricsJob < ApplicationJob
  queue_as :low

  include Metrics::SmartContract
  include Metrics::App

  def perform
    daily_metric = initialize_daily_metric
    daily_metric = collect_onboarding_metrics(daily_metric)
    daily_metric = collect_polygon_transactions(daily_metric)
    daily_metric = collect_celo_transactions(daily_metric)
    daily_metric.save!
    # Uploads the daily metric to the google sheet
    GoogleDrive::UploadMetrics.new(DailyMetric.last).call
  end

  private

  def initialize_daily_metric
    DailyMetric.new(
      date: date,
      total_users: total_users,
      total_connected_wallets: total_connected_wallets,
      total_active_users: total_active_users,
      total_dead_accounts: total_dead_accounts,
      total_advocates: total_advocates,
      total_scouts: total_scouts,
      total_beginner_quests_completed: total_beginner_quests_completed,
      total_complete_profile_quests_completed: total_complete_profile_quests_completed,
      total_supporter_quests_completed: total_supporter_quests_completed,
      total_twitter_followers: total_twitter_followers,
      total_discord_members: total_discord_members,
      total_users_with_subscribers: total_users_with_subscribers,
      total_users_subscribing: total_users_subscribing,
      total_users_with_three_or_more_subscribers: total_users_with_three_or_more_subscribers,
      total_users_subscribing_three_or_more: total_users_subscribing_three_or_more,
      total_users_with_career_updates: total_users_with_career_updates,
      total_career_updates: total_career_updates,
      daily_conversion_rate: daily_conversion_rate,
      time_on_page: time_on_page,
      visitors: daily_visitors,
      total_engaged_users: total_engaged_users,
      total_onboarded_users: total_onboarded_users,
      total_celo_tokens: total_celo_tokens,
      total_celo_supporters: total_celo_supporters,
      total_polygon_supporters: total_polygon_supporters,
      total_polygon_tokens: total_polygon_tokens,
      total_claimed_domains: total_claimed_domains,
      total_tal_subdomain_transactions: total_tal_subdomain_transactions,
      total_talent_token_applications: total_talent_token_applications,
      total_approved_talent_token_applications: total_approved_talent_token_applications,
      total_polygon_tvl: total_polygon_tvl,
      total_celo_tvl: total_celo_tvl,
      total_stables_stored_polygon: total_stables_stored_polygon,
      total_stables_stored_celo: total_stables_stored_celo,
      tal_rewards_given_polygon: tal_rewards_given_polygon,
      tal_rewards_given_celo: tal_rewards_given_celo
    )
  end
end
