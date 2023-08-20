module Web3
  class WhitelistTalentMate
    AVAILABLE_LEVELS = {
      verified: 2,
      token_holder: 5,
      talent_token: 6
    }

    attr_reader :key, :chain_id

    def initialize
      @key = Eth::Key.new priv: ENV["MATES_WALLET_PRIVATE_KEY"]
      @chain_id = 137
    end

    def call(user:, level:, &block)
      if user.wallet_id
        balance = client.call(mates_contract, "balanceOf", user.wallet_id)
        is_whitelisted = client.call(mates_contract, "isWhitelisted", user.wallet_id, "")
        if balance > 0 || is_whitelisted
          puts "User #{user.wallet_id} already has a Mate NFT or is already eligible for one"
        else
          tx_hash = client.transact(tal_contract, "whitelistAddress", user.wallet_id, AVAILABLE_LEVELS[level.to_sym], sender_key: key)

          puts "Whitelisting user #{user.wallet_id} with level #{level} -> tx: #{tx_hash}"
          if tx_hash
            yield(tx_hash) if block
            success = wait_for_tx_to_run(tx_hash)
            if success
              tx_hash
            end
          end
        end
      end
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
      ENV["POLYGON_RPC_URL"]
    end

    def talent_mates_abi
      @talent_mates_abi ||= JSON.parse(File.read("lib/abi/TalentNFT.json"))
    end

    def mates_address
      ENV["TALENT_MATES_ADDRESS"]
    end

    def mates_contract
      Eth::Contract.from_abi(name: "TalentNFT", address: mates_address, abi: talent_mates_abi["abi"])
    end
  end
end
