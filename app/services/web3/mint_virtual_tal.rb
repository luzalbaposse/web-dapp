require "web3_api/api_proxy"

module Web3
  class MintVirtualTal
    attr_reader :key, :chain_id

    REASONS_FOR_TRANSFER = {
      talent_tokens_sold: 3,
      in_app_rewards: 4,
      investor: 5
    }

    def initialize(chain_id:)
      @key = Eth::Key.new priv: ENV["WALLET_PRIVATE_KEY"]
      @chain_id = chain_id
    end

    def call(amount:, to:, reason:)
      user = User.find_by(wallet_id: to)

      return if user.nil?

      decimals = "1#{"0" * 18}"
      amount_to_charge = amount * decimals.to_i
      reason_id = REASONS_FOR_TRANSFER[reason.to_sym]

      tx_hash = client.transact_and_wait(tal_contract, "adminMint", to, amount_to_charge, reason_id, sender_key: key)

      if tx_hash
        WalletActivity.create(
          user: user,
          wallet: to,
          tx_date: Time.current,
          token: amount_to_charge.to_s,
          symbol: "TAL",
          tx_hash: tx_hash,
          chain_id: chain_id,
          event_type: "AdminMinted"
        )

        tx_hash
      else
        false
      end
    end

    private

    def client
      @client ||= Eth::Client.create rpc_url
    end

    def rpc_url
      return ENV["CELO_RPC_URL"] if celo_chain?

      ENV["POLYGON_RPC_URL"]
    end

    def celo_chain?
      (Web3Api::ApiProxy::CELO_CHAIN.include?(chain_id.to_s) || Web3Api::ApiProxy::TESTNET_CELO_CHAIN.include?(chain_id.to_s))
    end

    def tal_contract_abi
      @tal_contract_abi ||= JSON.parse(File.read("lib/abi/VirtualTAL.json"))
    end

    def tal_address
      return ENV["VIRTUAL_TAL_ADDRESS_CELO"] if celo_chain?

      ENV["VIRTUAL_TAL_ADDRESS_POLYGON"]
    end

    def tal_contract
      @tal_contract ||= Eth::Contract.from_abi(name: "VirtualTAL", address: tal_address, abi: tal_contract_abi["abi"])
    end
  end
end
