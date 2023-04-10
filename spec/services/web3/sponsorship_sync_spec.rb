require "rails_helper"

RSpec.describe Web3::SponsorshipSync do
  subject(:sponsorship_sync) { described_class.new(tx_hash, chain_id) }
  let(:tx_hash) { "0x9edaf3a5e15695457319969406024b59fd156a0b5433c4a5bbfe0444572b3561" }
  let(:chain_id) { 44787 }

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

  before do
    ENV["CELO_RPC_URL"] = "https://alfajores-forno.celo-testnet.org"
    allow(eth_client_class).to receive(:create).and_return(provider)
    allow(provider).to receive(:eth_get_transaction_receipt).and_return(transaction_receipt)
    allow(provider).to receive(:eth_get_block_by_hash).and_return(block_by_hash_response_mock)
    allow(provider).to receive(:chain_id).and_return(44787)
    allow(Rollbar).to receive(:error)
  end

  let(:block_hash) { transaction_receipt["result"]["blockHash"] }

  context "when the transaction receipt has a sponsor created event" do
    let(:transaction_receipt) { JSON.parse(file_fixture("talent_sponsorship/sponsor_created_transaction_receipt.json").read) }

    it "creates a new daily record with the correct arguments" do
      sponsorship_sync.call

      sponsorship = Sponsorship.last

      aggregate_failures do
        expect(sponsorship.sponsor).to eq "0x33041027dd8f4dc82b6e825fb37adf8f15d44053"
        expect(sponsorship.talent).to eq "0x33041027dd8f4dc82b6e825fb37adf8f15d44053"
        expect(sponsorship.amount).to eq 2000000000000000000
        expect(sponsorship.token).to eq "0x874069fa1eb16d44d622f2e0ca25eea172369bc1"
        expect(sponsorship.symbol).to eq "cUSD"
        expect(sponsorship.chain_id).to eq 44787
        expect(sponsorship.transactions).to match_array([tx_hash])
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
          talent: "0xe3103d2482ca341f75892a69696b3014ca673049",
          sponsor: "0xe3103d2482ca341f75892a69696b3014ca673049",
          token: "0x874069fa1eb16d44d622f2e0ca25eea172369bc1",
          symbol: "cUSD",
          chain_id: chain_id,
          transactions: ["transaction_1", "transaction_2"],
          claimed_at: nil,
          revoked_at: nil
        )
      end

      it "creates a new daily record with the correct arguments" do
        expect { sponsorship_sync.call }.not_to change(Sponsorship, :count)

        sponsorship = existing_sponsorship.reload

        expect(sponsorship.claimed_at).to eq expected_timestamp_time
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
end
