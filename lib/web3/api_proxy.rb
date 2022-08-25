require "web3/moralis/client"
require "web3/celo_explorer/client"

module Web3
  class ApiProxy
    class Error < StandardError; end

    class UnsupportedChainError < Error; end

    class ApiClientRequestError < Error; end

    SUPPORTED_CHAINS = %w[eth polygon celo]

    def initialize(wallet_address:, chain:)
      raise UnsupportedChainError.new("Invalid chain: #{chain}") unless SUPPORTED_CHAINS.include?(chain)

      @wallet_address = wallet_address
      @chain = chain
    end

    def retrieve_tokens
      return celo_explorer_tokens if celo_chain?

      moralis_tokens
    end

    def retrieve_nfts
      return celo_explorer_nfts if celo_chain?

      moralis_nfts
    end

    private

    attr_reader :wallet_address, :chain

    def celo_chain?
      chain == "celo"
    end

    def celo_explorer_tokens
      validate_response!(celo_explorer_tokens_response)

      response_body = JSON.parse(celo_explorer_tokens_response.body)

      tokens = response_body["result"].map do |item|
        if item["type"] == "ERC-20"
          {
            address: item["contractAddress"],
            name: item["name"],
            symbol: item["symbol"],
            logo: nil,
            thumbnail: nil,
            decimals: item["decimals"],
            balance: item["balance"]
          }
        end
      end

      tokens.compact
    end

    def moralis_tokens
      validate_response!(moralis_tokens_response)

      response_body = JSON.parse(moralis_tokens_response.body)

      response_body.map do |item|
        {
          address: item["token_address"],
          name: item["name"],
          symbol: item["symbol"],
          logo: item["logo"],
          thumbnail: item["thumbnail"],
          decimals: item["decimals"],
          balance: item["balance"]
        }
      end
    end

    def celo_explorer_nfts
      validate_response!(celo_explorer_tokens_response)

      response_body = JSON.parse(celo_explorer_tokens_response.body)

      tokens = response_body["result"].map do |item|
        if item["type"] == "ERC-721"
          {
            address: item["contractAddress"],
            token_id: nil,
            amount: item["balance"],
            name: item["name"],
            symbol: item["symbol"],
            token_uri: nil,
            metadata: nil
          }
        end
      end

      tokens.compact
    end

    def moralis_nfts
      validate_response!(moralis_nfts_response)

      response_body = JSON.parse(moralis_nfts_response.body)

      tokens = response_body["result"].map do |item|
        {
          address: item["token_address"],
          token_id: item["token_id"],
          amount: item["amount"],
          name: item["name"],
          symbol: item["symbol"],
          token_uri: item["token_uri"].start_with?("http") ? item["token_uri"] : nil,
          metadata: item["metadata"].present? ? JSON.parse(item["metadata"]) : nil
        }
      end

      tokens.compact
    end

    def celo_explorer_tokens_response
      @celo_explorer_tokens_response ||= celo_explorer_api_client.retrieve_tokens(wallet_address: wallet_address)
    end

    def moralis_tokens_response
      @moralis_tokens_response ||= moralis_api_client.retrieve_tokens(wallet_address: wallet_address, chain: chain)
    end

    def moralis_nfts_response
      @moralis_nfts_response ||= moralis_api_client.retrieve_nfts(wallet_address: wallet_address, chain: chain)
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
