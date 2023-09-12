module Web3Api
  module CeloExplorer
    class Client
      def retrieve_transactions(address:, start_timestamp:, end_timestamp: nil)
        params = {
          module: "account",
          action: "txlist",
          address: address,
          start_timestamp: start_timestamp
        }
        params[:end_timestamp] = end_timestamp if end_timestamp.present?

        Faraday.get(ENV["CELO_EXPLORER_BASE_URI"], params, headers)
      end

      private

      def headers
        {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      end
    end
  end
end
