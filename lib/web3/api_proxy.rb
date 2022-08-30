require "web3/moralis/client"
require "web3/celo_explorer/client"

module Web3
  class ApiProxy
    class Error < StandardError; end

    class UnsupportedChainError < Error; end

    class ApiClientRequestError < Error; end

    ETH_CHAIN = %w[eth 0x1]
    CELO_CHAIN = %w[celo 0xa4ec]
    POLYGON_CHAIN = %w[polygon 0x89]

    SUPPORTED_CHAINS = ETH_CHAIN + CELO_CHAIN + POLYGON_CHAIN

    def initialize(wallet_address:, chain: nil)
      @wallet_address = wallet_address
      @chain = chain
    end

    def retrieve_tokens
      validate_chain!

      return celo_explorer_tokens if celo_chain?

      moralis_tokens
    end

    def retrieve_nfts
      validate_chain!

      return tatum_nfts("CELO") if celo_chain?

      moralis_nfts
    end

    def retrieve_poaps
      gnosis_poaps
    end

    private

    attr_reader :wallet_address, :chain

    def validate_chain!
      raise UnsupportedChainError.new("Invalid chain: #{chain}/#{formatted_chain}, valid chains: #{SUPPORTED_CHAINS.join(", ")}") unless SUPPORTED_CHAINS.include?(formatted_chain)
    end

    def celo_chain?
      CELO_CHAIN.include?(formatted_chain)
    end

    def formatted_chain
      @formatted_chain ||= chain.is_a?(Integer) ? "0x#{chain.to_s(16).downcase}" : chain.downcase
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

    def tatum_nfts(chain)
      response = tatum_nfts_response(chain)
      validate_response!(response)

      response_body = JSON.parse(response.body)

      tokens = response_body.map do |item|
        item["metadata"].map do |token_metadata|
          {
            address: item["contractAddress"],
            token_id: token_metadata["tokenId"],
            amount: 1,
            name: token_metadata["metadata"].present? ? token_metadata["metadata"]["name"] : nil,
            symbol: token_metadata["metadata"].present? ? token_metadata["metadata"]["name"] : nil,
            token_uri: token_metadata["url"].start_with?("http") ? token_metadata["url"] : nil,
            metadata: token_metadata["metadata"].present? ? token_metadata["metadata"] : nil
          }
        end
      end

      tokens.flatten.compact
    end

    def gnosis_poaps
      response = gnosis_chain_explorer_client.retrieve_tokens(wallet_address: wallet_address)
      validate_response!(response)

      response_body = JSON.parse(response.body)

      token_ids_and_contract_address = response_body["result"].map do |result|
        next if result["tokenName"] != "POAP"

        {token_id: result["tokenID"], contract_address: result["contractAddress"]}
      end

      token_ids_and_contract_address.compact
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

    def tatum_nfts_response(chain)
      @tatum_nfts_response ||= tatum_api_client.retrieve_nfts(wallet_address: wallet_address, chain: chain)
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

    def tatum_api_client
      @tatum_api_client ||= Tatum::Client.new
    end

    def gnosis_chain_explorer_client
      @gnosis_chain_explorer_client ||= GnosisChainExplorer::Client.new
    end
  end
end
