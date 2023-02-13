module Web3
  class EnsDomainOwner
    GOERLI_PROVIDER_URL = "https://rpc.ankr.com/eth_goerli"
    MAINNET_PROVIDER_URL = "https://eth.llamarpc.com"

    def initialize(domain:)
      @domain = domain
    end

    def call
      ens_client.owner(domain)
    end

    private

    attr_reader :domain

    def ens_client
      @ens_client ||= Eth::Ens::Resolver.new(provider)
    end

    def provider
      @provider ||= Eth::Client.create provider_url
    end

    def provider_url
      (ENV["CONTRACTS_ENV"] == "production") ? MAINNET_PROVIDER_URL : GOERLI_PROVIDER_URL
    end
  end
end
