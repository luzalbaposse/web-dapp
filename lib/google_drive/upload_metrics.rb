module GoogleDrive
  class UploadMetrics
    METRICS_SHEET_ID = "1eNhm1_xyv3iZ-ipqTZ4tTsnJKBKH8BsRIalJNgiYfX4"

    def initialize(daily_metric)
      @daily_metric = daily_metric
    end

    def call
      # Add empty row before the second row
      # The second row is the last data point
      daily_data_sheet.insert_rows(2, daily_metric_row)
      daily_data_sheet.save
    end

    private

    attr_reader :daily_metric

    def daily_metric_row
      [[
        daily_metric.date.to_s,
        daily_metric.total_users,
        daily_metric.total_connected_wallets,
        daily_metric.total_engaged_users,
        daily_metric.total_active_users,
        daily_metric.total_onboarded_users,
        daily_metric.total_dead_accounts,
        daily_metric.daily_conversion_rate * 100,
        daily_metric.total_talent_token_applications,
        daily_metric.total_approved_talent_token_applications,
        0,
        0,
        0,
        daily_metric.time_on_page,
        daily_metric.visitors,
        daily_metric.total_celo_tokens,
        daily_metric.total_celo_supporters,
        daily_metric.total_polygon_tokens,
        daily_metric.total_polygon_supporters,
        daily_metric.total_celo_stake_transactions,
        daily_metric.total_celo_sponsorship_transactions,
        daily_metric.total_polygon_stake_transactions,
        daily_metric.total_polygon_sponsorship_transactions,
        daily_metric.total_mates_nfts,
        total_celo_transactions,
        total_polygon_transactions,
        daily_metric.total_tal_subdomain_transactions,
        total_blockchain_transactions,
        daily_metric.total_claimed_domains,
        daily_metric.total_polygon_tvl,
        daily_metric.total_celo_tvl,
        daily_metric.total_celo_tvl.to_i + daily_metric.total_polygon_tvl.to_i,
        daily_metric.total_stables_stored_polygon,
        daily_metric.total_stables_stored_celo,
        daily_metric.total_stables_stored_polygon.to_i + daily_metric.total_stables_stored_celo.to_i,
        daily_metric.tal_rewards_given_polygon,
        daily_metric.tal_rewards_given_celo,
        daily_metric.tal_rewards_given_polygon.to_i + daily_metric.tal_rewards_given_celo.to_i,
        daily_metric.total_advocates,
        daily_metric.total_scouts,
        daily_metric.total_twitter_followers,
        daily_metric.total_discord_members,
        daily_metric.total_old_users_season_3.to_i,
        daily_metric.total_new_users_season_3.to_i,
        daily_metric.total_organic_users_season_3.to_i,
        daily_metric.total_referral_users_season_3.to_i,
        daily_metric.total_users_with_subscribers,
        daily_metric.total_users_subscribing,
        daily_metric.total_users_with_three_or_more_subscribers,
        daily_metric.total_users_subscribing_three_or_more,
        daily_metric.total_users_with_career_updates,
        daily_metric.total_career_updates,
        daily_metric.total_verified_users,
        daily_metric.total_emails_sent_by_app,
        daily_metric.total_emails_delivered,
        daily_metric.total_emails_opened,
        daily_metric.total_app_notifications,
        daily_metric.total_app_read_notifications,
        daily_metric.daily_join_pages_visitors,
        daily_metric.total_linkedin_signups,
        daily_metric.total_email_signups,
        daily_metric.total_celo_sponsorship_volume_cusd,
        daily_metric.total_celo_sponsorship_volume_gdollar,
        daily_metric.total_polygon_sponsorship_volume_usdc,
        daily_metric.total_unique_sponsors,
        daily_metric.total_unique_sponsoring,
        daily_metric.total_messages,
        daily_metric.total_messages_read,
        daily_metric.total_users_that_sent_messages,
        daily_metric.total_users_that_received_messages,
        daily_metric.total_users_with_active_goals,
        daily_metric.total_old_users_season_4.to_i,
        daily_metric.total_new_users_season_4.to_i,
        daily_metric.total_organic_users_season_4.to_i,
        daily_metric.total_referral_users_season_4.to_i
      ]]
    end

    def total_blockchain_transactions
      total_polygon_transactions + total_celo_transactions
    end

    def total_polygon_transactions
      daily_metric.total_polygon_stake_transactions.to_i + daily_metric.total_polygon_sponsorship_transactions.to_i + daily_metric.total_mates_nfts.to_i
    end

    def total_celo_transactions
      daily_metric.total_celo_stake_transactions.to_i + daily_metric.total_celo_sponsorship_transactions.to_i
    end

    def daily_data_sheet
      @daily_data_sheet ||= metrics_sheet.worksheet_by_title("Daily Data")
    end

    def metrics_sheet
      session.spreadsheet_by_key(METRICS_SHEET_ID)
    end

    def session
      @session ||= GoogleDrive::Session.from_service_account_key(StringIO.new(config))
    end

    def config
      ENV["GOOGLE_SERVICE_ACCOUNT_JSON"]
    end
  end
end
