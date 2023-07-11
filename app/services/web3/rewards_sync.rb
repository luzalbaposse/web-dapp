require "web3_api/api_proxy"

# For the current flow to work the first transaction needs to have a SponsorshipCreated event
# It should not be possible to have a SponsorshipRevoked or a Withdraw event without creating the sponsorship first in a previous transaction
module Web3
  class RewardsSync
    class Error < StandardError; end

    class InvalidEventError < Error; end

    def initialize(tx_hash, chain_id)
      @tx_hash = tx_hash
      @chain_id = chain_id
    end

    def call
      decoded_event = decoded_transaction_event

      if !decoded_event
        raise "No valid event found"
      end

      args = decoded_event.kwargs

      if decoded_event.name == "RewardWithdrawal"
        user = User.find_by!(wallet_id: args[:owner])

        wallet_activity = WalletActivity.find_or_initialize_by(
          user: user,
          wallet: args[:owner],
          tx_date: transaction_timestamp,
          token: args[:stakerReward],
          symbol: "TAL",
          tx_hash: tx_hash,
          chain_id: chain_id,
          event_type: "RewardWithdrawal"
        )

        wallet_activity.save!
        wallet_activity
      elsif decoded_event.name == "TalentRewardWithdrawal"
        user = User.find_by!(wallet_id: args[:talentTokenWallet])

        wallet_activity = WalletActivity.find_or_initialize_by(
          user: user,
          wallet: args[:owner],
          tx_date: transaction_timestamp,
          token: args[:reward],
          symbol: "TAL",
          tx_hash: tx_hash,
          chain_id: chain_id,
          event_type: "TalentRewardWithdrawal"
        )

        wallet_activity.save!
        wallet_activity
      end
    rescue => e
      Rollbar.error(
        e,
        "Something went wrong upserting transaction",
        tx_hash: tx_hash,
        chain_id: chain_id,
        decoded_event: decoded_event
      )
    end

    private

    attr_reader :tx_hash, :chain_id, :with_notifications

    def decoded_transaction_event
      events_interface = staking_contract_abi["abi"].select { |i| i["type"] == "event" }
      results = Eth::Abi::Event.decode_logs(events_interface, transaction_receipt["result"]["logs"]).to_a

      # Let's get the first object with a decoded event
      event = results.find { |r| r[1].present? }
      if event
        # The first item is the log, the second is the decoded log
        event[1]
      end
    end

    def transaction_timestamp
      block_hash = transaction_receipt["result"]["blockHash"]
      block = provider.eth_get_block_by_hash(block_hash, false)
      Time.at(block["result"]["timestamp"].to_i(16))
    end

    def transaction_receipt
      @transaction_receipt ||= provider.eth_get_transaction_receipt(tx_hash)
    end

    def provider
      @provider ||= Eth::Client.create rpc_url
    end

    def rpc_url
      return ENV["CELO_RPC_URL"] if celo_chain?

      ENV["POLYGON_RPC_URL"]
    end

    def celo_chain?
      (Web3Api::ApiProxy::CELO_CHAIN.include?(chain_id.to_s) || Web3Api::ApiProxy::TESTNET_CELO_CHAIN.include?(chain_id.to_s))
    end

    def staking_contract_abi
      @staking_contract_abi ||= JSON.parse(File.read("lib/abi/StakingV3.json"))
    end
  end
end
