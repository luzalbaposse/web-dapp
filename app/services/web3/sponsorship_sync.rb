module Web3
  class SponsorshipSync
    TALENT_SPONSORSHIP_ADDRESS = "0xFb32c3635fbA97046E83804fB903254507aE32A4"

    def call(tx_hash = nil)
      return if Sponsorship.where(tx_hash: tx_hash).exists?

      logs = provider.eth_get_transaction_receipt(tx_hash)
      interface = talent_sponsorship_contract_abi["abi"].find { |i| i["type"] == "event" && i["name"] == "SponsorshipCreated" }

      event_data = nil

      logs["result"]["logs"].each do |log|
        event_data = Eth::Abi::Event.decode_log(interface["inputs"], log["data"], log["topics"])
      rescue Eth::Abi::DecodingError => e
        puts e
      end

      if event_data.present?
        Sponsorship.create!(
          sponsor: event_data[1][:sponsor],
          talent: event_data[1][:talent],
          amount: event_data[1][:amount],
          token: event_data[1][:token],
          symbol: event_data[1][:symbol],
          tx_hash: tx_hash,
          chain_id: @provider.chain_id
        )
      end
    end

    private

    def provider
      @provider ||= Eth::Client.create "https://alfajores-forno.celo-testnet.org"
    end

    def talent_sponsorship
      @talent_sponsorship ||= Eth::Contract.from_abi(
        name: talent_sponsorship_contract_abi["contractName"],
        address: TALENT_SPONSORSHIP_ADDRESS,
        abi: talent_sponsorship_contract_abi["abi"]
      )
    end

    def talent_sponsorship_contract_abi
      @talent_sponsorship_contract_abi ||= JSON.parse(File.read("lib/abi/TalentSponsorship.json"))
    end
  end
end
