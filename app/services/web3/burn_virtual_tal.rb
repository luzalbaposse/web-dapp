require "web3_api/api_proxy"

module Web3
  class BurnVirtualTal
    attr_reader :key, :chain_id

    def initialize(chain_id:)
      @key = Eth::Key.new priv: ENV["WALLET_PRIVATE_KEY"]
      @chain_id = chain_id
    end

    def call(amount:, to:, &block)
      user = User.find_by(wallet_id: to)

      return if user.nil?

      decimals = "1#{"0" * 18}"
      amount_to_charge = amount * decimals.to_i

      tx_hash = client.transact(tal_contract, "adminBurn", to, amount_to_charge, sender_key: key)

      if tx_hash
        yield(tx_hash) if block
        success = wait_for_tx_to_run(tx_hash)
        if success
          return tx_hash
        end
      end

      false
    end

    private

    def wait_for_tx_to_run(tx_hash)
      # at most wait - 30 seconds
      max_attempts = 300
      attempts = 0
      while !client.tx_mined?(tx_hash) && attempts < max_attempts
        attempts += 1
        sleep 0.1 # 100ms
      end

      # confirm we broke the loop with mined TX
      if client.tx_mined?(tx_hash)
        client.tx_succeeded?(tx_hash)
      else
        false
      end
    end

    def client
      c = Eth::Client.create rpc_url
      c.max_priority_fee_per_gas = 100 * Eth::Unit::GWEI
      c.max_fee_per_gas = 300 * Eth::Unit::GWEI
      c
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
      Eth::Contract.from_abi(name: "VirtualTAL", address: tal_address, abi: tal_contract_abi["abi"])
    end
  end
end
