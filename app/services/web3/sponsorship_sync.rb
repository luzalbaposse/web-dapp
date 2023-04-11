require "web3_api/api_proxy"

# For the current flow to work the first transaction needs to have a SponsorshipCreated event
# It should not be possible to have a SponsorshipRevoked or a Withdraw event without creating the sponsorship first in a previous transaction
module Web3
  class SponsorshipSync
    class Error < StandardError; end

    class InvalidEventError < Error; end

    def initialize(tx_hash, chain_id)
      @tx_hash = tx_hash
      @chain_id = chain_id
    end

    def call
      decoded_event = decoded_transaction_event
      args = decoded_event.kwargs

      sponsorship = Sponsorship.find_or_initialize_by(
        chain_id: provider.chain_id,
        sponsor: args[:sponsor],
        talent: args[:talent],
        token: args[:token],
        symbol: args[:symbol],
        claimed_at: nil,
        revoked_at: nil
      )
      transactions = sponsorship.transactions
      transactions << tx_hash unless transactions.include?(tx_hash)

      case decoded_event.event_interface["name"]
      when "SponsorshipCreated"
        amount = sponsorship.amount.to_i + args[:amount]
        sponsorship.update!(
          amount: amount,
          transactions: transactions
        )
      when "SponsorshipRevoked"
        sponsorship.update!(
          revoked_at: transaction_timestamp,
          transactions: transactions
        )
      when "Withdraw"
        sponsorship.update!(
          claimed_at: transaction_timestamp,
          transactions: transactions
        )
      else
        raise InvalidEventError.new
      end
    rescue => e
      Rollbar.error(
        e,
        "Something went wrong upserting transaction",
        tx_hash: tx_hash,
        chain_id: chain_id,
        decoded_event: decoded_event,
        sponsorship_id: sponsorship&.id
      )
    end

    private

    attr_reader :tx_hash, :chain_id

    def decoded_transaction_event
      events_interface = talent_sponsorship_contract_abi["abi"].select { |i| i["type"] == "event" }
      results = Eth::Abi::Event.decode_logs(events_interface, transaction_receipt["result"]["logs"]).to_a

      # Let's get the first object with a decoded event
      event = results.find { |r| r[1].present? }
      # The first item is the log, the second is the decoded log
      event[1]
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

    def talent_sponsorship_contract_abi
      @talent_sponsorship_contract_abi ||= JSON.parse(File.read("lib/abi/TalentSponsorship.json"))
    end
  end
end
