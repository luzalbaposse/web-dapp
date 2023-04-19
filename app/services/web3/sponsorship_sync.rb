require "web3_api/api_proxy"

# For the current flow to work the first transaction needs to have a SponsorshipCreated event
# It should not be possible to have a SponsorshipRevoked or a Withdraw event without creating the sponsorship first in a previous transaction
module Web3
  class SponsorshipSync
    class Error < StandardError; end

    class InvalidEventError < Error; end

    def initialize(tx_hash, chain_id, with_notifications = true)
      @tx_hash = tx_hash
      @chain_id = chain_id
      @with_notifications = with_notifications
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
        persisted_sponsorship = sponsorship.persisted?

        sponsorship.update!(
          amount: amount,
          transactions: transactions
        )

        if !persisted_sponsorship && sponsorship.talent_user && sponsorship.sponsor_user && with_notifications
          CreateNotification.new.call(
            recipient: sponsorship.talent_user,
            type: NewSponsorNotification,
            source_id: sponsorship.sponsor_user.id
          )
        end
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

        if sponsorship.talent_user && sponsorship.sponsor_user
          if with_notifications
            CreateNotification.new.call(
              recipient: sponsorship.sponsor_user,
              type: SponsorshipClaimedNotification,
              source_id: sponsorship.talent_user.id
            )
          end

          update_connections(sponsorship.sponsor_user, sponsorship.talent_user)
        end
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

    attr_reader :tx_hash, :chain_id, :with_notifications

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

    def update_connections(sponsor_user, talent_user)
      sponsor_connection ||= Connection.find_or_initialize_by(
        user: sponsor_user,
        connected_user: talent_user
      )

      sponsor_connection.refresh_connection!

      sponsored_connection ||= Connection.find_or_initialize_by(
        user: talent_user,
        connected_user: sponsor_user
      )

      sponsored_connection.refresh_connection!
    end
  end
end
