require "web3_api/celo_explorer/client"
require "web3_api/moralis/client"

module Web3Api
  class ApiProxy
    class Error < StandardError; end

    class UnsupportedChainError < Error; end

    class ApiClientRequestError < Error; end

    SUPPORTED_CHAIN_IDS = %w[0x1 0xa4ec 0x89]
    SUPPORTED_CHAIN_NAMES = %w[celo eth polygon]

    CELO_CHAIN = %w[celo 0xa4ec 42220]
    ETH_CHAIN = %w[eth 0x1 1]
    POLYGON_CHAIN = %w[polygon 0x89 137]

    TESTNET_CELO_CHAIN = %w[celo 0xaef3 44787]
    TESTNET_ETH_CHAIN = %w[eth 0x3 3]
    TESTNET_POLYGON_CHAIN = %w[polygon 0x1f41 80001]

    GNOSIS_CHAIN_ID = 100

    SUPPORTED_CHAINS = SUPPORTED_CHAIN_IDS + SUPPORTED_CHAIN_NAMES

    def retrieve_transactions_count(address:, start_timestamp:, chain:, end_timestamp: nil)
      validate_chain!(chain)

      formatted_chain = formatted_chain(chain)

      return celo_explorer_transactions(address, start_timestamp, end_timestamp).count if celo?(formatted_chain)

      moralis_transactions_count(address, start_timestamp, end_timestamp, formatted_chain)
    end

    def retrieve_polygon_nfts_count(address:)
      response = moralis_contract_nfts_response(address, "polygon")

      validate_response!(response)

      response_body = JSON.parse(response.body)

      response_body["total_tokens"].to_i
    end

    private

    def validate_chain!(chain)
      formatted_chain = formatted_chain(chain)

      raise UnsupportedChainError.new("Invalid chain: #{chain}/#{formatted_chain}, valid chains: #{SUPPORTED_CHAINS.join(", ")}") unless SUPPORTED_CHAINS.include?(formatted_chain)
    end

    def celo?(chain)
      CELO_CHAIN.include?(formatted_chain(chain))
    end

    def formatted_chain(chain)
      chain.is_a?(Integer) ? "0x#{chain.to_s(16).downcase}" : chain.downcase
    end

    def celo_explorer_transactions(address, start_timestamp, end_timestamp)
      response = celo_explorer_api_client.retrieve_transactions(
        address: address,
        start_timestamp: start_timestamp,
        end_timestamp: end_timestamp
      )
      validate_response!(response)

      response_body = JSON.parse(response.body)

      response_body["result"]
    end

    def moralis_transactions_count(address, start_timestamp, end_timestamp, chain)
      response = moralis_api_client.retrieve_transactions(
        address: address,
        start_timestamp: start_timestamp,
        end_timestamp: end_timestamp,
        chain: chain
      )

      validate_response!(response)

      response_body = JSON.parse(response.body)
      response_body["total"]
    end

    def moralis_contract_nfts_response(contract_address, chain)
      moralis_api_client.retrieve_contract_nfts(contract_address: contract_address, chain: chain)
    end

    def celo_explorer_transactions_response(wallet_address, start_timestamp)
      celo_explorer_api_client.retrieve_transactions(address: address, start_timestamp: start_timestamp)
    end

    def moralis_transactions_response(wallet_address, start_timestamp, chain)
      moralis_api_client.retrieve_transactions(address: address, start_timestamp: start_timestamp, chain: chain)
    end

    def validate_response!(response)
      raise ApiClientRequestError.new(response.body) unless response.success?
    end

    def moralis_api_client
      @moralis_api_client ||= Moralis::Client.new
    end

    def celo_explorer_api_client
      @celo_explorer_api_client ||= CeloExplorer::Client.new
    end
  end
end
