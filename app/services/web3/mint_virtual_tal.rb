require "web3_api/api_proxy"

module Web3
  class MintVirtualTal
    REASONS_FOR_TRANSFER = {
      talent_tokens_sold: 3,
      in_app_rewards: 4,
      investor: 5,
      experience_rewards: 4
    }

    APP_DESCRIPTION = {
      talent_tokens_sold: "Unstake",
      in_app_rewards: "AdminMinted",
      investor: "AdminMinted",
      experience_rewards: "ExperienceRewards"
    }

    def initialize(chain_id:)
      @chain_id = chain_id
    end

    def call(amount:, to:, reason:)
      user = User.find_by(wallet_id: to&.downcase)

      return if user.nil?

      reason_id = REASONS_FOR_TRANSFER[reason.to_sym]

      resp = client.invoke({
        function_name: ENV["MINT_VIRTUAL_TAL_LAMBDA_FUNCTION"],
        invocation_type: "RequestResponse",
        log_type: "None",
        payload: JSON.generate({
          wallet_id: to,
          reason: reason_id,
          amount: amount.to_s,
          virtual_tal_address: tal_address,
          provider_url: rpc_url
        })
      })

      response = JSON.parse(resp.payload.string)

      if response["statusCode"] != 200
        Rollbar.error(
          "Unable to mint virtual TAL",
          error: response["body"]["error"],
          wallet_id: to,
          reason: reason_id,
          amount: amount.to_s,
          virtual_tal_address: tal_address,
          provider_url: rpc_url
        )
        return
      end

      tx_hash = response["body"]["tx"]

      decimals = "1#{"0" * 18}"
      amount_to_charge = amount * decimals.to_i

      WalletActivity.create!(
        user: user,
        wallet: to,
        tx_date: Time.current,
        token: amount_to_charge.to_s,
        symbol: "TAL",
        tx_hash: tx_hash,
        chain_id: chain_id,
        event_type: APP_DESCRIPTION[reason.to_sym]
      )
      tx_hash
    end

    private

    attr_reader :chain_id

    def rpc_url
      return ENV["CELO_RPC_URL"] if celo_chain?

      ENV["POLYGON_RPC_URL"]
    end

    def celo_chain?
      (Web3Api::ApiProxy::CELO_CHAIN.include?(chain_id.to_s) || Web3Api::ApiProxy::TESTNET_CELO_CHAIN.include?(chain_id.to_s))
    end

    def tal_address
      return ENV["VIRTUAL_TAL_ADDRESS_CELO"] if celo_chain?

      ENV["VIRTUAL_TAL_ADDRESS_POLYGON"]
    end

    def client
      @client ||= Aws::Lambda::Client.new(region: "eu-west-2")
    end
  end
end
