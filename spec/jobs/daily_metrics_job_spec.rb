require "rails_helper"

RSpec.describe DailyMetricsJob, type: :job do
  let!(:user_1) { create :user, last_access_at: 5.days.ago, created_at: 5.days.ago, linkedin_id: "123" }
  let!(:talent) { create :talent, user: user_1, updated_at: Date.today, verified: true }
  let!(:talent_token) { create :talent_token, talent: talent, deployed: true }
  let!(:user_2) { create :user, last_access_at: Date.yesterday, talent: talent_2 }
  let!(:talent_2) { create :talent, updated_at: Date.yesterday }

  let!(:user_3) { create :user, created_at: Date.yesterday }
  let!(:message) { create :message, sender: user_3, receiver: user_1, created_at: 10.days.ago }

  let!(:user_4) { create :user, onboarded_at: nil }

  let!(:user_5) { create :user }
  let!(:talent_supporter) { create :talent_supporter, supporter_wallet_id: user_5.wallet_id, talent_contract_id: talent_token.contract_id, last_time_bought_at: 15.days.ago }

  let!(:user_6) { create :user, created_at: Date.new(2023, 0o1, 0o5), onboarded_at: Date.new(2023, 0o1, 6), invite_id: nil }

  let!(:tal_domain) { create :user_domain, domain: "dinis.tal.community", tal_domain: true, user: user_6 }

  let!(:subscription_one) { create :subscription, user: user_1, subscriber: user_2, accepted_at: Date.yesterday }
  let!(:subscription_two) { create :subscription, user: user_1, subscriber: user_3, accepted_at: Date.yesterday - 10.days }
  let!(:subscription_three) { create :subscription, user: user_1, subscriber: user_4, accepted_at: Date.yesterday - 15.days }
  let!(:subscription_four) { create :subscription, user: user_3, subscriber: user_2, accepted_at: Date.yesterday - 30.days }
  let!(:subscription_five) { create :subscription, user: user_4, subscriber: user_2, accepted_at: Date.yesterday }

  let!(:career_update_one) { create :career_update, user: user_1 }
  let!(:career_update_two) { create :career_update, user: user_2 }
  let!(:career_update_three) { create :career_update, user: user_2 }

  let!(:notification_one) { create :notification, read_at: nil, recipient: user_1 }
  let!(:notification_two) { create :notification, read_at: nil, recipient: user_1 }
  let!(:notification_three) { create :notification, read_at: Time.current, recipient: user_2 }

  let(:web3_proxy_class) { Web3Api::ApiProxy }
  let(:web3_proxy) { instance_double(web3_proxy_class) }

  let(:upload_metrics_class) { GoogleDrive::UploadMetrics }
  let(:upload_metrics) { instance_double(upload_metrics_class, call: true) }

  let(:date) { Date.yesterday }

  let(:simple_analytics_request) { "https://simpleanalytics.com/beta.talentprotocol.com.json?#{simple_analytics_request_params.to_query}" }
  let(:simple_analytics_request_params) do
    {
      end: date.end_of_day,
      fields: "pages,seconds_on_page,visitors",
      info: false,
      start: date.beginning_of_day,
      version: 5
    }
  end

  let(:simple_analytics_body) do
    {
      seconds_on_page: 18,
      visitors: 300
    }
  end

  let(:simple_analytics_join_request) { "https://simpleanalytics.com/beta.talentprotocol.com/join*.json?#{simple_analytics_join_request_params.to_query}" }
  let(:simple_analytics_join_request_params) do
    {
      end: date.end_of_day,
      fields: "visitors",
      info: false,
      start: date.beginning_of_day,
      version: 5
    }
  end

  let(:simple_analytics_join_body) do
    {
      visitors: 200
    }
  end

  let(:twitter_request) { "https://api.twitter.com/2/users/1383059435111780352?user.fields=public_metrics" }
  let(:twitter_body) do
    {
      data: {
        public_metrics: {
          followers_count: 10000
        }
      }
    }
  end

  let(:discord_request) { "https://discord.com/api/v9/invites/talentprotocol?with_counts=true&with_expiration=true" }
  let(:discord_body) do
    {
      approximate_member_count: 6000
    }
  end

  let(:eth_client_class) { Eth::Client }
  let(:provider) { instance_double(eth_client_class) }
  let(:eth_contract_class) { Eth::Contract }
  let(:eth_contract) { instance_double(eth_contract_class) }

  let(:sendgrid_api_class) { SendGrid::API }
  let(:sendgrid_api) { instance_double(sendgrid_api_class, client: sendgrid_client) }
  let(:sendgrid_client) { double(SendGrid::Client) }

  let(:sendgrid_response) do
    OpenStruct.new(
      status_code: "200",
      body: sendgrid_response_body.to_json
    )
  end

  let(:sendgrid_response_body) do
    [
      {
        "date" => "2022-01-01",
        "stats" => [
          {
            "metrics" => {
              "delivered" => 20,
              "requests" => 30,
              "unique_opens" => 10
            }
          }
        ]
      },
      {
        "date" => "2022-02-01",
        "stats" => [
          {
            "metrics" => {
              "delivered" => 10,
              "requests" => 10,
              "unique_opens" => 10
            }
          }
        ]
      }
    ]
  end

  before do
    allow(web3_proxy_class).to receive(:new).and_return(web3_proxy)
    allow(upload_metrics_class).to receive(:new).and_return(upload_metrics)
    allow(sendgrid_api_class).to receive(:new).and_return(sendgrid_api)
    allow(sendgrid_client).to receive_message_chain(:stats, :get).and_return(sendgrid_response)
    allow(web3_proxy).to receive(:retrieve_transactions_count).and_return(10)
    allow(web3_proxy).to receive(:retrieve_polygon_nfts_count).and_return(400)
    stub_request(:get, simple_analytics_request).to_return(body: simple_analytics_body.to_json)
    stub_request(:get, simple_analytics_join_request).to_return(body: simple_analytics_join_body.to_json)
    stub_request(:get, twitter_request).to_return(body: twitter_body.to_json)
    stub_request(:get, discord_request).to_return(body: discord_body.to_json)
    allow(eth_client_class).to receive(:create).and_return(provider)
    allow(provider).to receive(:call).and_return(60000000000000000000000)
    allow(eth_contract_class).to receive(:from_abi).and_return(eth_contract)
  end

  subject(:daily_metrics_refresh) { described_class.perform_now }

  it "creates a new daily record" do
    expect { daily_metrics_refresh }.to change(DailyMetric, :count).from(0).to(1)
  end

  it "creates a new daily record with the correct arguments" do
    daily_metrics_refresh

    created_daily_metric = DailyMetric.last

    aggregate_failures do
      expect(created_daily_metric.total_users).to eq 6
      expect(created_daily_metric.date).to eq date
      expect(created_daily_metric.total_engaged_users).to eq 5
      expect(created_daily_metric.total_active_users).to eq 1
      expect(created_daily_metric.total_onboarded_users).to eq 5
      expect(created_daily_metric.daily_conversion_rate).to eq(1.to_f / 200)
      expect(created_daily_metric.total_mates_nfts).to eq 400
      expect(created_daily_metric.total_tal_subdomain_transactions).to eq 10
      expect(created_daily_metric.total_polygon_stake_transactions).to eq 40
      expect(created_daily_metric.total_celo_stake_transactions).to eq 20
      expect(created_daily_metric.total_claimed_domains).to eq 1
      expect(created_daily_metric.total_polygon_tvl).to eq 60000
      expect(created_daily_metric.total_celo_tvl).to eq 60000
      expect(created_daily_metric.total_stables_stored_polygon).to eq "6.0e+16"
      expect(created_daily_metric.total_stables_stored_celo).to eq "60000"
      expect(created_daily_metric.tal_rewards_given_polygon).to eq "60000"
      expect(created_daily_metric.tal_rewards_given_celo).to eq "60000"
      expect(created_daily_metric.time_on_page).to eq 18
      expect(created_daily_metric.visitors).to eq 300
      expect(created_daily_metric.total_twitter_followers).to eq 10000
      expect(created_daily_metric.total_discord_members).to eq 6000
      expect(created_daily_metric.total_users_with_subscribers).to eq 3
      expect(created_daily_metric.total_users_subscribing).to eq 3
      expect(created_daily_metric.total_users_with_three_or_more_subscribers).to eq 1
      expect(created_daily_metric.total_users_subscribing_three_or_more).to eq 1
      expect(created_daily_metric.total_users_with_career_updates).to eq 2
      expect(created_daily_metric.total_verified_users).to eq 1
      expect(created_daily_metric.total_app_notifications).to eq 3
      expect(created_daily_metric.total_app_read_notifications).to eq 1
      expect(created_daily_metric.total_emails_sent_by_app).to eq 40
      expect(created_daily_metric.total_emails_delivered).to eq 30
      expect(created_daily_metric.total_emails_opened).to eq 20
      expect(created_daily_metric.daily_join_pages_visitors).to eq 200
      expect(created_daily_metric.total_linkedin_signups).to eq 1
      expect(created_daily_metric.total_email_signups).to eq 5
    end
  end

  it "makes a request to retrieve symple analytics metrics" do
    daily_metrics_refresh

    expect(
      a_request(:get, simple_analytics_request)
    )
      .to have_been_made
      .once
  end

  it "initializes two eth providers" do
    daily_metrics_refresh

    expect(eth_client_class).to have_received(:create).twice
  end

  it "calls both staking contracts" do
    daily_metrics_refresh

    expect(provider).to have_received(:call).with(
      eth_contract,
      "totalTokensStaked"
    ).twice
  end

  it "initializes and calls the upload metrics service" do
    daily_metrics_refresh

    expect(upload_metrics_class).to have_received(:new).with(
      DailyMetric.last
    )
    expect(upload_metrics).to have_received(:call)
  end
end
