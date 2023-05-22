require "the_graph/queries"

module TheGraph
  module Celo
    MAX_RECORDS = 100

    begin
      TALENT_SUPPORTERS = ::TheGraphAPI::Celo::Client.parse TheGraph::Queries::TALENT_SUPPORTERS_QUERY
    rescue NameError => error
      Rollbar.error(error, "TheGraph client for celo is down")
    end

    class Client
      class Error < StandardError; end

      class QueryError < Error; end

      def talent_supporters(talent_address:, variance_start_date:, offset: 0)
        query TALENT_SUPPORTERS, id: talent_address, variance_start_date: variance_start_date, skip: offset, first: MAX_RECORDS
      end

      private

      def query(definition, variables = {})
        response = ::TheGraphAPI::Celo::Client.query(definition, variables: variables)

        if response.errors.any?
          raise QueryError.new(response.errors[:data].join(", "))
        else
          response.data
        end
      end
    end
  end
end
