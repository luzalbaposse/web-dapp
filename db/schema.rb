# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_05_11_103940) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_stat_statements"
  enable_extension "pgcrypto"
  enable_extension "plpgsql"

  create_table "activities", force: :cascade do |t|
    t.string "content", null: false
    t.bigint "origin_user_id", null: false
    t.bigint "target_user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "type"
    t.boolean "global", default: false
    t.index ["origin_user_id"], name: "index_activities_on_origin_user_id"
    t.index ["target_user_id"], name: "index_activities_on_target_user_id"
  end

  create_table "activity_feed_activities", force: :cascade do |t|
    t.bigint "activity_feed_id", null: false
    t.bigint "activity_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["activity_feed_id"], name: "index_activity_feed_activities_on_activity_feed_id"
    t.index ["activity_id"], name: "index_activity_feed_activities_on_activity_id"
  end

  create_table "activity_feeds", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_activity_feeds_on_user_id"
  end

  create_table "api_keys", force: :cascade do |t|
    t.text "access_key", null: false
    t.string "name", null: false
    t.string "description"
    t.datetime "activated_at", precision: nil
    t.datetime "revoked_at", precision: nil
    t.string "revoked_reason"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "api_log_requests", force: :cascade do |t|
    t.text "ip_ciphertext", null: false
    t.string "ip_bidx"
    t.string "method"
    t.string "path"
    t.jsonb "request_body"
    t.jsonb "response_body"
    t.integer "response_code"
    t.bigint "api_key_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["api_key_id"], name: "index_api_log_requests_on_api_key_id"
    t.index ["ip_bidx"], name: "index_api_log_requests_on_ip_bidx"
  end

  create_table "blazer_audits", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "query_id"
    t.text "statement"
    t.string "data_source"
    t.datetime "created_at", precision: nil
    t.index ["query_id"], name: "index_blazer_audits_on_query_id"
    t.index ["user_id"], name: "index_blazer_audits_on_user_id"
  end

  create_table "blazer_checks", force: :cascade do |t|
    t.bigint "creator_id"
    t.bigint "query_id"
    t.string "state"
    t.string "schedule"
    t.text "emails"
    t.text "slack_channels"
    t.string "check_type"
    t.text "message"
    t.datetime "last_run_at", precision: nil
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["creator_id"], name: "index_blazer_checks_on_creator_id"
    t.index ["query_id"], name: "index_blazer_checks_on_query_id"
  end

  create_table "blazer_dashboard_queries", force: :cascade do |t|
    t.bigint "dashboard_id"
    t.bigint "query_id"
    t.integer "position"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["dashboard_id"], name: "index_blazer_dashboard_queries_on_dashboard_id"
    t.index ["query_id"], name: "index_blazer_dashboard_queries_on_query_id"
  end

  create_table "blazer_dashboards", force: :cascade do |t|
    t.bigint "creator_id"
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["creator_id"], name: "index_blazer_dashboards_on_creator_id"
  end

  create_table "blazer_queries", force: :cascade do |t|
    t.bigint "creator_id"
    t.string "name"
    t.text "description"
    t.text "statement"
    t.string "data_source"
    t.string "status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["creator_id"], name: "index_blazer_queries_on_creator_id"
  end

  create_table "career_goals", force: :cascade do |t|
    t.text "description"
    t.bigint "talent_id", null: false
    t.date "target_date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "bio"
    t.string "pitch"
    t.string "challenges"
    t.text "image_data"
    t.index ["talent_id"], name: "index_career_goals_on_talent_id"
  end

  create_table "career_needs", force: :cascade do |t|
    t.string "title", null: false
    t.bigint "career_goal_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["career_goal_id"], name: "index_career_needs_on_career_goal_id"
  end

  create_table "career_updates", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.uuid "uuid", default: -> { "gen_random_uuid()" }, null: false
    t.text "text_ciphertext", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_career_updates_on_user_id"
    t.index ["uuid"], name: "index_career_updates_on_uuid"
  end

  create_table "chats", force: :cascade do |t|
    t.datetime "last_message_at", precision: nil, null: false
    t.bigint "sender_id", null: false
    t.bigint "receiver_id", null: false
    t.integer "sender_unread_messages_count", default: 0
    t.integer "receiver_unread_messages_count", default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "last_message_text_ciphertext"
    t.index ["receiver_id"], name: "index_chats_on_receiver_id"
    t.index ["sender_id", "receiver_id"], name: "index_chats_on_sender_id_and_receiver_id", unique: true
    t.index ["sender_id"], name: "index_chats_on_sender_id"
  end

  create_table "connections", force: :cascade do |t|
    t.string "user_invested_amount"
    t.string "connected_user_invested_amount"
    t.integer "connection_type", null: false
    t.datetime "connected_at", precision: nil, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.bigint "connected_user_id"
    t.uuid "uuid", default: -> { "gen_random_uuid()" }, null: false
    t.index ["connected_user_id"], name: "index_connections_on_connected_user_id"
    t.index ["connection_type"], name: "index_connections_on_connection_type"
    t.index ["created_at"], name: "index_connections_on_created_at"
    t.index ["user_id", "connected_user_id"], name: "index_connections_on_user_id_and_connected_user_id", unique: true
    t.index ["user_id"], name: "index_connections_on_user_id"
    t.index ["uuid"], name: "index_connections_on_uuid", unique: true
    t.check_constraint "user_id <> connected_user_id", name: "user_connections_constraint"
  end

  create_table "daily_metrics", force: :cascade do |t|
    t.date "date", null: false
    t.integer "total_users"
    t.integer "total_connected_wallets"
    t.integer "total_active_users"
    t.integer "total_dead_accounts"
    t.integer "total_talent_profiles"
    t.integer "total_engaged_users"
    t.integer "total_advocates"
    t.integer "total_scouts"
    t.integer "total_beginner_quests_completed"
    t.integer "total_complete_profile_quests_completed"
    t.integer "total_ambassador_quests_completed"
    t.integer "total_supporter_quests_completed"
    t.integer "total_celo_tokens"
    t.integer "total_celo_supporters"
    t.integer "total_polygon_tokens"
    t.integer "total_polygon_supporters"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "total_polygon_stake_transactions"
    t.integer "total_celo_stake_transactions"
    t.integer "total_mates_nfts"
    t.integer "total_onboarded_users"
    t.integer "total_talent_token_applications"
    t.integer "total_approved_talent_token_applications"
    t.integer "time_on_page"
    t.integer "visitors"
    t.integer "total_polygon_tvl"
    t.integer "total_celo_tvl"
    t.integer "total_twitter_followers"
    t.integer "total_discord_members"
    t.integer "total_claimed_domains"
    t.integer "total_tal_subdomain_transactions"
    t.jsonb "daily_page_visitors", default: {}
    t.jsonb "total_onboarding_metrics", default: {}
    t.string "total_stables_stored_polygon"
    t.string "total_stables_stored_celo"
    t.string "tal_rewards_given_polygon"
    t.string "tal_rewards_given_celo"
    t.integer "total_polygon_sponsorship_transactions"
    t.integer "total_celo_sponsorship_transactions"
    t.integer "total_users_with_subscribers"
    t.integer "total_users_subscribing"
    t.integer "total_users_with_career_updates"
    t.integer "total_career_updates"
    t.decimal "daily_conversion_rate", precision: 10, scale: 4, default: "0.0"
    t.integer "total_users_with_three_or_more_subscribers"
    t.integer "total_users_subscribing_three_or_more"
  end

  create_table "discovery_rows", force: :cascade do |t|
    t.string "title", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "badge"
    t.string "badge_link"
    t.string "slug"
    t.text "description"
    t.bigint "partnership_id"
    t.index ["partnership_id"], name: "index_discovery_rows_on_partnership_id"
  end

  create_table "erc20_tokens", force: :cascade do |t|
    t.string "address", null: false
    t.string "name"
    t.string "symbol"
    t.string "logo"
    t.string "thumbnail"
    t.integer "decimals"
    t.string "balance"
    t.integer "chain_id", null: false
    t.boolean "show", default: false
    t.bigint "user_id", null: false
    t.datetime "last_sync_at", precision: nil
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "token_image_data"
    t.index ["user_id"], name: "index_erc20_tokens_on_user_id"
  end

  create_table "erc721_tokens", force: :cascade do |t|
    t.string "address", null: false
    t.string "name"
    t.string "symbol"
    t.string "url"
    t.json "metadata"
    t.string "token_id"
    t.string "amount"
    t.integer "chain_id", null: false
    t.boolean "show", default: false
    t.string "nft_type", null: false
    t.bigint "user_id", null: false
    t.datetime "last_sync_at", precision: nil
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "description"
    t.string "external_image_url"
    t.index ["user_id"], name: "index_erc721_tokens_on_user_id"
  end

  create_table "goal_images", force: :cascade do |t|
    t.bigint "goal_id", null: false
    t.text "image_data"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["goal_id"], name: "index_goal_images_on_goal_id"
  end

  create_table "goals", force: :cascade do |t|
    t.date "due_date", null: false
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "career_goal_id"
    t.string "title"
    t.string "link"
    t.string "progress"
    t.index ["career_goal_id"], name: "index_goals_on_career_goal_id"
  end

  create_table "impersonations", force: :cascade do |t|
    t.bigint "impersonator_id"
    t.bigint "impersonated_id"
    t.text "ip_ciphertext", null: false
    t.string "ip_bidx"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["impersonated_id"], name: "index_impersonations_on_impersonated_id"
    t.index ["impersonator_id"], name: "index_impersonations_on_impersonator_id"
    t.index ["ip_bidx"], name: "index_impersonations_on_ip_bidx"
  end

  create_table "invites", force: :cascade do |t|
    t.string "code", null: false
    t.integer "uses", default: 0
    t.integer "max_uses", default: 2
    t.boolean "talent_invite", default: false
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "partnership_id"
    t.index ["partnership_id"], name: "index_invites_on_partnership_id"
    t.index ["user_id"], name: "index_invites_on_user_id"
  end

  create_table "leaderboards", force: :cascade do |t|
    t.uuid "uuid", default: -> { "gen_random_uuid()" }, null: false
    t.bigint "race_id", null: false
    t.bigint "user_id", null: false
    t.integer "score", default: 0, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["race_id"], name: "index_leaderboards_on_race_id"
    t.index ["user_id"], name: "index_leaderboards_on_user_id"
    t.index ["uuid"], name: "index_leaderboards_on_uuid"
  end

  create_table "marketing_articles", force: :cascade do |t|
    t.string "link", null: false
    t.string "title", null: false
    t.string "description"
    t.text "image_data"
    t.date "article_created_at"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_marketing_articles_on_user_id"
  end

  create_table "messages", force: :cascade do |t|
    t.integer "sender_id"
    t.integer "receiver_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "text_ciphertext"
    t.boolean "is_read", default: false, null: false
    t.boolean "sent_to_supporters", default: false
    t.bigint "chat_id"
    t.bigint "career_update_id"
    t.index ["career_update_id"], name: "index_messages_on_career_update_id"
    t.index ["chat_id"], name: "index_messages_on_chat_id"
    t.index ["receiver_id"], name: "index_messages_on_receiver_id"
    t.index ["sender_id"], name: "index_messages_on_sender_id"
  end

  create_table "milestone_images", force: :cascade do |t|
    t.bigint "milestone_id", null: false
    t.text "image_data"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["milestone_id"], name: "index_milestone_images_on_milestone_id"
  end

  create_table "milestones", force: :cascade do |t|
    t.string "title", null: false
    t.date "start_date", null: false
    t.date "end_date"
    t.string "description"
    t.string "link"
    t.string "institution"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "talent_id"
    t.string "category"
    t.boolean "in_progress", default: false
    t.index ["talent_id"], name: "index_milestones_on_talent_id"
  end

  create_table "notifications", force: :cascade do |t|
    t.string "type", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "recipient_type", null: false
    t.bigint "recipient_id", null: false
    t.jsonb "params"
    t.datetime "read_at", precision: nil
    t.datetime "emailed_at", precision: nil
    t.index ["read_at"], name: "index_notifications_on_read_at"
    t.index ["recipient_type", "recipient_id"], name: "index_notifications_on_recipient"
  end

  create_table "partnerships", force: :cascade do |t|
    t.string "name", null: false
    t.text "logo_data"
    t.string "website_url"
    t.string "description"
    t.string "twitter_url"
    t.bigint "invite_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "banner_data"
    t.string "button_name"
    t.string "button_url"
    t.string "location"
    t.index ["invite_id"], name: "index_partnerships_on_invite_id"
  end

  create_table "perks", force: :cascade do |t|
    t.integer "price", null: false
    t.string "title", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "talent_id"
    t.index ["talent_id"], name: "index_perks_on_talent_id"
  end

  create_table "product_announcements", force: :cascade do |t|
    t.uuid "uuid", default: -> { "gen_random_uuid()" }, null: false
    t.string "title", null: false
    t.text "content", null: false
    t.text "image_data"
    t.string "link"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["uuid"], name: "index_product_announcements_on_uuid"
  end

  create_table "profile_page_visitors", force: :cascade do |t|
    t.text "ip_ciphertext", null: false
    t.string "ip_bidx"
    t.bigint "user_id", null: false
    t.datetime "last_visited_at", precision: nil
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["ip_bidx"], name: "index_profile_page_visitors_on_ip_bidx"
    t.index ["user_id"], name: "index_profile_page_visitors_on_user_id"
  end

  create_table "quests", force: :cascade do |t|
    t.string "status", default: "pending"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "type"
    t.index ["user_id"], name: "index_quests_on_user_id"
  end

  create_table "races", force: :cascade do |t|
    t.datetime "started_at", precision: nil
    t.datetime "ends_at", precision: nil
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.uuid "uuid", default: -> { "gen_random_uuid()" }, null: false
  end

  create_table "rewards", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "reason"
    t.string "category", default: "OTHER"
    t.bigint "amount"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "creator_id"
    t.boolean "imported", default: false
    t.string "identifier"
    t.index ["creator_id"], name: "index_rewards_on_creator_id"
    t.index ["identifier"], name: "index_rewards_on_identifier", unique: true
    t.index ["user_id"], name: "index_rewards_on_user_id"
  end

  create_table "sponsorships", force: :cascade do |t|
    t.string "sponsor", null: false
    t.string "talent", null: false
    t.string "amount", null: false
    t.string "token", null: false
    t.string "symbol", null: false
    t.integer "chain_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "claimed_at", precision: nil
    t.datetime "revoked_at", precision: nil
    t.uuid "uuid", default: -> { "gen_random_uuid()" }, null: false
    t.string "transactions", default: [], array: true
    t.integer "token_decimals", default: 18
  end

  create_table "subscriptions", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.bigint "subscriber_id"
    t.datetime "accepted_at", precision: nil
    t.uuid "uuid", default: -> { "gen_random_uuid()" }, null: false
    t.string "subscribed_back_status", default: "no_request"
    t.index ["subscriber_id"], name: "index_subscriptions_on_subscriber_id"
    t.index ["user_id", "subscriber_id"], name: "index_subscriptions_on_user_id_and_subscriber_id", unique: true
    t.index ["user_id"], name: "index_subscriptions_on_user_id"
  end

  create_table "tags", force: :cascade do |t|
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "discovery_row_id"
    t.boolean "hidden", default: false
    t.integer "user_tags_count", default: 0, null: false
    t.index ["description"], name: "index_tags_on_description"
    t.index ["discovery_row_id"], name: "index_tags_on_discovery_row_id"
  end

  create_table "talent", force: :cascade do |t|
    t.string "public_key"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.datetime "ito_date", precision: nil
    t.integer "activity_count", default: 0
    t.text "profile_picture_data"
    t.boolean "public", default: false
    t.jsonb "profile", default: {}
    t.text "banner_data"
    t.boolean "token_launch_reminder_sent", default: false
    t.string "notion_page_id"
    t.integer "supporters_count"
    t.string "total_supply"
    t.boolean "hide_profile", default: false, null: false
    t.boolean "open_to_job_offers", default: false, null: false
    t.boolean "verified", default: false
    t.integer "experience_level", default: 0
    t.string "market_cap", default: "0"
    t.decimal "market_cap_variance", precision: 10, scale: 2, default: "0.0"
    t.string "with_persona_id"
    t.index ["activity_count"], name: "index_talent_on_activity_count"
    t.index ["ito_date"], name: "index_talent_on_ito_date"
    t.index ["public_key"], name: "index_talent_on_public_key", unique: true
    t.index ["user_id"], name: "index_talent_on_user_id"
  end

  create_table "talent_supporters", force: :cascade do |t|
    t.string "amount"
    t.string "tal_amount"
    t.string "supporter_wallet_id", null: false
    t.string "talent_contract_id", null: false
    t.datetime "synced_at", precision: nil, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "last_time_bought_at", precision: nil
    t.datetime "first_time_bought_at", precision: nil
    t.index ["supporter_wallet_id", "talent_contract_id"], name: "talent_supporters_wallet_token_contract_uidx", unique: true
  end

  create_table "talent_tokens", force: :cascade do |t|
    t.string "ticker"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "talent_id"
    t.boolean "deployed", default: false
    t.string "contract_id"
    t.datetime "deployed_at", precision: nil
    t.integer "chain_id"
    t.index ["chain_id"], name: "index_talent_tokens_on_chain_id"
    t.index ["talent_id"], name: "index_talent_tokens_on_talent_id"
    t.index ["ticker"], name: "index_talent_tokens_on_ticker", unique: true
  end

  create_table "tasks", force: :cascade do |t|
    t.string "status", default: "pending"
    t.string "type"
    t.bigint "quest_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["quest_id"], name: "index_tasks_on_quest_id"
  end

  create_table "transfers", force: :cascade do |t|
    t.bigint "amount"
    t.string "tx_hash"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.string "wallet_id"
    t.index ["user_id"], name: "index_transfers_on_user_id"
    t.index ["wallet_id"], name: "index_transfers_on_wallet_id"
  end

  create_table "user_domains", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "domain", null: false
    t.integer "chain_id", null: false
    t.string "wallet", null: false
    t.string "provider", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "tal_domain", default: false
    t.string "theme", default: "light"
    t.index ["user_id", "domain", "chain_id", "wallet"], name: "unique_user_domain_fields_index", unique: true
    t.index ["user_id"], name: "index_user_domains_on_user_id"
  end

  create_table "user_email_logs", force: :cascade do |t|
    t.jsonb "sent_at_data", default: {}
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_user_email_logs_on_user_id", unique: true
  end

  create_table "user_product_announcements", force: :cascade do |t|
    t.uuid "uuid", default: -> { "gen_random_uuid()" }, null: false
    t.bigint "user_id", null: false
    t.bigint "product_announcement_id", null: false
    t.datetime "read_at", precision: nil
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["product_announcement_id"], name: "index_user_product_announcements_on_product_announcement_id"
    t.index ["user_id"], name: "index_user_product_announcements_on_user_id"
    t.index ["uuid"], name: "index_user_product_announcements_on_uuid"
  end

  create_table "user_profile_type_changes", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "who_dunnit_id", null: false
    t.string "previous_profile_type"
    t.string "new_profile_type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "note"
    t.index ["user_id"], name: "index_user_profile_type_changes_on_user_id"
    t.index ["who_dunnit_id"], name: "index_user_profile_type_changes_on_who_dunnit_id"
    t.check_constraint "previous_profile_type::text <> new_profile_type::text", name: "profile_types_check_constraint"
  end

  create_table "user_tags", force: :cascade do |t|
    t.bigint "tag_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.index ["tag_id"], name: "index_user_tags_on_tag_id"
    t.index ["user_id"], name: "index_user_tags_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username", null: false
    t.string "email"
    t.string "encrypted_password", limit: 128
    t.string "remember_token", limit: 128, null: false
    t.string "role"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "confirmation_token", limit: 128
    t.integer "sign_in_count", default: 0
    t.datetime "last_sign_in_at", precision: nil
    t.string "wallet_id"
    t.string "nounce"
    t.string "email_confirmation_token", default: "", null: false
    t.datetime "email_confirmed_at", precision: nil
    t.string "display_name"
    t.bigint "invite_id"
    t.boolean "tokens_purchased", default: false
    t.boolean "token_purchase_reminder_sent", default: false
    t.boolean "disabled", default: false
    t.string "theme_preference", default: "light"
    t.boolean "messaging_disabled", default: false
    t.jsonb "notification_preferences", default: {}
    t.string "user_nft_address"
    t.boolean "user_nft_minted", default: false
    t.integer "user_nft_token_id"
    t.string "user_nft_tx"
    t.string "member_nft_address"
    t.boolean "member_nft_minted", default: false
    t.integer "member_nft_token_id"
    t.string "member_nft_tx"
    t.bigint "race_id"
    t.string "profile_type", default: "supporter", null: false
    t.boolean "first_quest_popup", default: false, null: false
    t.datetime "last_access_at", precision: nil
    t.datetime "complete_profile_reminder_sent_at", precision: nil
    t.datetime "token_launch_reminder_sent_at", precision: nil
    t.datetime "token_purchase_reminder_sent_at", precision: nil
    t.datetime "digest_email_sent_at", precision: nil
    t.string "ens_domain"
    t.string "linkedin_id"
    t.string "delete_account_token"
    t.datetime "delete_account_token_expires_at", precision: nil
    t.string "legal_first_name"
    t.string "legal_last_name"
    t.boolean "whitelisted_talent_mate", default: false
    t.datetime "onboarded_at"
    t.uuid "uuid", default: -> { "gen_random_uuid()" }, null: false
    t.string "utm_source"
    t.index ["created_at"], name: "index_users_on_created_at"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["invite_id"], name: "index_users_on_invite_id"
    t.index ["linkedin_id"], name: "index_users_on_linkedin_id", unique: true
    t.index ["race_id"], name: "index_users_on_race_id"
    t.index ["remember_token"], name: "index_users_on_remember_token"
    t.index ["username"], name: "index_users_on_username", unique: true
    t.index ["uuid"], name: "index_users_on_uuid", unique: true
    t.index ["wallet_id"], name: "index_users_on_wallet_id", unique: true
  end

  create_table "versions", force: :cascade do |t|
    t.string "item_type", null: false
    t.bigint "item_id", null: false
    t.string "event", null: false
    t.string "whodunnit"
    t.text "object"
    t.datetime "created_at", precision: nil
    t.text "object_changes"
    t.index ["item_type", "item_id"], name: "index_versions_on_item_type_and_item_id"
  end

  create_table "with_persona_requests", force: :cascade do |t|
    t.integer "requests_counter", default: 0, null: false
    t.integer "month", null: false
    t.integer "year", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "activities", "users", column: "origin_user_id"
  add_foreign_key "activities", "users", column: "target_user_id"
  add_foreign_key "activity_feed_activities", "activities"
  add_foreign_key "activity_feed_activities", "activity_feeds"
  add_foreign_key "activity_feeds", "users"
  add_foreign_key "api_log_requests", "api_keys"
  add_foreign_key "career_goals", "talent"
  add_foreign_key "career_needs", "career_goals"
  add_foreign_key "career_updates", "users"
  add_foreign_key "chats", "users", column: "receiver_id"
  add_foreign_key "chats", "users", column: "sender_id"
  add_foreign_key "connections", "users"
  add_foreign_key "connections", "users", column: "connected_user_id"
  add_foreign_key "discovery_rows", "partnerships"
  add_foreign_key "erc20_tokens", "users"
  add_foreign_key "erc721_tokens", "users"
  add_foreign_key "goal_images", "goals"
  add_foreign_key "goals", "career_goals"
  add_foreign_key "impersonations", "users", column: "impersonated_id"
  add_foreign_key "impersonations", "users", column: "impersonator_id"
  add_foreign_key "invites", "partnerships"
  add_foreign_key "invites", "users"
  add_foreign_key "leaderboards", "races"
  add_foreign_key "leaderboards", "users"
  add_foreign_key "marketing_articles", "users"
  add_foreign_key "messages", "career_updates"
  add_foreign_key "messages", "chats"
  add_foreign_key "milestone_images", "milestones"
  add_foreign_key "milestones", "talent"
  add_foreign_key "partnerships", "invites"
  add_foreign_key "perks", "talent"
  add_foreign_key "profile_page_visitors", "users"
  add_foreign_key "quests", "users"
  add_foreign_key "rewards", "users"
  add_foreign_key "rewards", "users", column: "creator_id"
  add_foreign_key "subscriptions", "users"
  add_foreign_key "subscriptions", "users", column: "subscriber_id"
  add_foreign_key "tags", "discovery_rows"
  add_foreign_key "talent_tokens", "talent"
  add_foreign_key "tasks", "quests"
  add_foreign_key "transfers", "users"
  add_foreign_key "user_domains", "users"
  add_foreign_key "user_email_logs", "users"
  add_foreign_key "user_product_announcements", "product_announcements"
  add_foreign_key "user_product_announcements", "users"
  add_foreign_key "user_profile_type_changes", "users"
  add_foreign_key "user_profile_type_changes", "users", column: "who_dunnit_id"
  add_foreign_key "user_tags", "tags"
  add_foreign_key "user_tags", "users"
end
