require "rails_helper"

RSpec.describe Web3::SponsorshipSync do
  include ActiveJob::TestHelper

  subject(:sponsorship_sync) { described_class.new(tx_hash, chain_id, with_notifications) }
  let(:tx_hash) { "0x9edaf3a5e15695457319969406024b59fd156a0b5433c4a5bbfe0444572b3561" }
  let(:chain_id) { 44787 }
  let(:with_notifications) { false }

  let(:block_by_hash_response_mock) do
    {
      "result" => {
        "timestamp" => hex_timestamp
      }
    }
  end
  let(:hex_timestamp) { "0x642da1f1" }
  let(:expected_timestamp_time) { Time.at(hex_timestamp.to_i(16)) }

  let(:eth_client_class) { Eth::Client }
  let(:provider) { instance_double(eth_client_class) }
  let(:eth_contract_class) { Eth::Contract }
  let(:eth_contract) { instance_double(eth_contract_class) }

  let(:create_notification_class) { CreateNotification }
  let(:create_notification_instance) { instance_double(create_notification_class, call: true) }

  before do
    ENV["CELO_RPC_URL"] = "https://alfajores-forno.celo-testnet.org"
    allow(eth_client_class).to receive(:create).and_return(provider)
    allow(provider).to receive(:eth_get_transaction_receipt).and_return(transaction_receipt)
    allow(provider).to receive(:eth_get_block_by_hash).and_return(block_by_hash_response_mock)
    allow(provider).to receive(:chain_id).and_return(44787)
    allow(provider).to receive(:call).and_return(6)
    allow(Rollbar).to receive(:error)
    allow(create_notification_class).to receive(:new).and_return(create_notification_instance)
  end

  let(:block_hash) { transaction_receipt["result"]["blockHash"] }

  context "when the transaction receipt has a sponsor created event" do
    let(:transaction_receipt) { JSON.parse(file_fixture("talent_sponsorship/sponsor_created_transaction_receipt.json").read) }

    it "creates a new daily record with the correct arguments" do
      sponsorship_sync.call

      sponsorship = Sponsorship.last

      aggregate_failures do
        expect(sponsorship.sponsor).to eq "0x33041027dd8f4dc82b6e825fb37adf8f15d44053"
        expect(sponsorship.talent).to eq "0x33041027dd8f4dc82b6e825fb37adf8f15d44052"
        expect(sponsorship.amount).to eq "2000000000000000000"
        expect(sponsorship.token).to eq "0x874069fa1eb16d44d622f2e0ca25eea172369bc1"
        expect(sponsorship.token_decimals).to eq 6
        expect(sponsorship.symbol).to eq "cUSD"
        expect(sponsorship.chain_id).to eq 44787
        expect(sponsorship.transactions).to match_array([tx_hash])
      end
    end

    context "when notifications are enabled" do
      let(:with_notifications) { true }
      let!(:talent_user) { create :user, wallet_id: "0x33041027dd8f4dc82b6e825fb37adf8f15d44052" }
      let!(:sponsor_user) { create :user, wallet_id: "0x33041027dd8f4dc82b6e825fb37adf8f15d44053" }

      it "initializes and calls the create notification service" do
        sponsorship_sync.call

        expect(create_notification_class).to have_received(:new)
        expect(create_notification_instance).to have_received(:call).with(
          recipient: talent_user,
          type: NewSponsorNotification,
          source_id: sponsor_user.id
        )
      end
    end
  end

  context "when the transaction receipt has a sponsor revoked event" do
    let(:transaction_receipt) { JSON.parse(file_fixture("talent_sponsorship/sponsor_revoked_transaction_receipt.json").read) }

    context "when there's an existing sponsorship" do
      let!(:existing_sponsorship) do
        create(
          :sponsorship,
          talent: "0xe3103d2482ca341f75892a69696b3014ca673049",
          sponsor: "0xe3103d2482ca341f75892a69696b3014ca673049",
          token: "0x874069fa1eb16d44d622f2e0ca25eea172369bc1",
          symbol: "cUSD",
          token_decimals: 6,
          chain_id: chain_id,
          transactions: ["transaction_1", "transaction_2"],
          claimed_at: nil,
          revoked_at: nil
        )
      end

      it "creates a new daily record with the correct arguments" do
        expect { sponsorship_sync.call }.not_to change(Sponsorship, :count)

        sponsorship = existing_sponsorship.reload

        expect(sponsorship.revoked_at).to eq expected_timestamp_time
        expect(sponsorship.transactions).to match_array ["transaction_1", "transaction_2", tx_hash]
      end
    end

    context "when there's no existing sponsorship" do
      it "raises the error to Rollbar" do
        sponsorship_sync.call

        expect(Rollbar).to have_received(:error)
      end
    end
  end

  context "when the transaction receipt has a sponsor withdraw event" do
    let(:transaction_receipt) { JSON.parse(file_fixture("talent_sponsorship/withdraw_transaction_receipt.json").read) }

    context "when there's an existing sponsorship" do
      let!(:existing_sponsorship) do
        create(
          :sponsorship,
          talent: "0xe3103d2482ca341f75892a69696b3014ca673048",
          sponsor: "0xe3103d2482ca341f75892a69696b3014ca673049",
          token: "0x874069fa1eb16d44d622f2e0ca25eea172369bc1",
          symbol: "cUSD",
          token_decimals: 6,
          chain_id: chain_id,
          transactions: ["transaction_1", "transaction_2"],
          claimed_at: nil,
          revoked_at: nil
        )
      end
      let!(:sponsor_user) { create :user, wallet_id: "0xe3103d2482ca341f75892a69696b3014ca673049" }
      let(:refresh_user_quest_class) { Quests::RefreshUserQuest }
      let(:refresh_user_quest_instance) { instance_double(refresh_user_quest_class, call: true) }

      before do
        allow(refresh_user_quest_class).to receive(:new).and_return(refresh_user_quest_instance)
      end

      it "creates a new daily record with the correct arguments" do
        expect { sponsorship_sync.call }.not_to change(Sponsorship, :count)

        sponsorship = existing_sponsorship.reload

        expect(sponsorship.claimed_at).to eq expected_timestamp_time
        expect(sponsorship.transactions).to match_array ["transaction_1", "transaction_2", tx_hash]
      end

      it "does not initialize the create notification service" do
        sponsorship_sync.call

        expect(create_notification_class).not_to have_received(:new)
      end

      it "refreshes user quest" do
        sponsorship_sync.call

        sponsorship = existing_sponsorship.reload
        quest = Quest.find_by(quest_type: "sponsor_talent")

        aggregate_failures do
          expect(refresh_user_quest_class).to have_received(:new).with(
            user: sponsorship.sponsor_user,
            quest: quest
          )
          expect(refresh_user_quest_instance).to have_received(:call)
        end
      end

      context "when both users have wallets connected" do
        let!(:talent_user) { create :user, wallet_id: "0xe3103d2482ca341f75892a69696b3014ca673048" }

        it "creates the connections with the correct arguments" do
          sponsorship_sync.call

          sponsor_connection = sponsor_user.connections.last
          sponsored_connection = talent_user.connections.last

          aggregate_failures do
            expect(sponsor_connection.user).to eq(sponsor_user)
            expect(sponsor_connection.connected_user).to eq(talent_user)
            expect(sponsor_connection.connection_type).to eq("sponsor")

            expect(sponsored_connection.user).to eq(talent_user)
            expect(sponsored_connection.connected_user).to eq(sponsor_user)
            expect(sponsored_connection.connection_type).to eq("sponsored")
          end
        end

        context "when notifications are enabled" do
          let(:with_notifications) { true }

          it "initializes and calls the create notification service" do
            sponsorship_sync.call

            expect(create_notification_class).to have_received(:new)
            expect(create_notification_instance).to have_received(:call).with(
              recipient: sponsor_user,
              type: SponsorshipClaimedNotification,
              source_id: talent_user.id
            )
          end

          it "enqueues the ActivityIngestJob to add it to the activity feed" do
            Sidekiq::Testing.inline! do
              sponsorship_sync.call

              job = enqueued_jobs.find { |j| j["job_class"] == "ActivityIngestJob" }

              aggregate_failures do
                expect(job["job_class"]).to eq("ActivityIngestJob")
                expect(job["arguments"][0]).to eq("sponsor")
                expect(job["arguments"][2]).to eq(sponsor_user.id)
                expect(job["arguments"][3]).to eq(talent_user.id)
              end
            end
          end
        end
      end
    end

    context "when there's no existing sponsorship" do
      it "raises the error to Rollbar" do
        sponsorship_sync.call

        expect(Rollbar).to have_received(:error)
      end
    end
  end
end
