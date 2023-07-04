class DailyMetric < ApplicationRecord
  store :daily_page_visitors, accessors: %i[
    voya_visitors
    wtfcrypto_visitors
    talenthouse_visitors
    talentmates_visitors
  ], coder: JSON

  store :total_onboarding_metrics, accessors: %i[
    total_old_users_season_3
    total_new_users_season_3
    total_organic_users_season_3
    total_referral_users_season_3
    total_old_users_season_4
    total_new_users_season_4
    total_organic_users_season_4
    total_referral_users_season_4
  ], coder: JSON
end
