require "web3_api/api_proxy"

module Web3
  class BurnVirtualTal
    MUMBAI_PROVIDER_URL = "https://rpc-mumbai.maticvigil.com"
    MAINNET_PROVIDER_URL = "https://polygon-rpc.com/"

    def initialize(chain_id:)
      @chain_id = chain_id
    end

    def call(amount:, from:, &block)
      user = User.find_by(wallet_id: from)

      return if user.nil?

      if user.wallet_id
        resp = client.invoke({
          function_name: ENV["BURN_VIRTUAL_TAL_LAMBDA_FUNCTION"],
          invocation_type: "RequestResponse",
          log_type: "None",
          payload: JSON.generate({
            wallet_id: from,
            amount: amount,
            virtual_tal_address: virtual_tal_address,
            provider_url: rpc_url
          })
        })

        response = JSON.parse(resp.payload.string)

        if response["statusCode"] == 200
          response["body"]["tx"]
        elsif response["statusCode"] == 400
          Rollbar.warning("Unable to burn vTAL of user ##{user.id}", response: response)
          false
        elsif response["statusCode"] == 500
          Rollbar.error("Unable to burn vTAL of ##{user.id}", response: response)
          false
        end
      end
    end

    private

    attr_reader :chain_id

    def client
      @client ||= Aws::Lambda::Client.new(region: "eu-west-2")
    end

    def rpc_url
      return ENV["CELO_RPC_URL"] if celo_chain?

      ENV["POLYGON_RPC_URL"]
    end

    def celo_chain?
      (Web3Api::ApiProxy::CELO_CHAIN.include?(chain_id.to_s) || Web3Api::ApiProxy::TESTNET_CELO_CHAIN.include?(chain_id.to_s))
    end

    def virtual_tal_address
      return ENV["VIRTUAL_TAL_ADDRESS_CELO"] if celo_chain?

      ENV["VIRTUAL_TAL_ADDRESS_POLYGON"]
    end
  end
end
