require "graphql/client"
require "graphql/client/http"

# The Graph API wrapper
module TheGraphAPI
  CHAIN_TO_NAME = {
    137 => "Polygon",
    44787 => "Alfajores",
    42220 => "Celo",
    80001 => "Mumbai"
  }

  module Celo
    HTTP = GraphQL::Client::HTTP.new("https://api.thegraph.com/subgraphs/name/talent-protocol/prod") do
      def headers(context)
        {"User-Agent": "Talent Protocol"}
      end
    end

    begin
      Schema = GraphQL::Client.load_schema(HTTP)

      Client = GraphQL::Client.new(schema: Schema, execute: HTTP)
    rescue KeyError, Net::ReadTimeout => error
      # This is a hack to get around the fact that the Celo subgraph is not available
      puts "Error loading Celo subgraph schema"
      Rollbar.error(
        error, "Error loading Celo subgraph schema"
      )
    end
  end

  module Alfajores
    HTTP = GraphQL::Client::HTTP.new("https://api.thegraph.com/subgraphs/name/talent-protocol/alfajores-dev-v3") do
      def headers(context)
        {"User-Agent": "Talent Protocol"}
      end
    end

    begin
      Schema = GraphQL::Client.load_schema(HTTP)

      Client = GraphQL::Client.new(schema: Schema, execute: HTTP)
    rescue KeyError, Net::ReadTimeout => error
      # This is a hack to get around the fact that the Alfajores subgraph is not available
      puts "Error loading Alfajores subgraph schema"
      Rollbar.error(
        error, "Error loading Alfajores subgraph schema"
      )
    end
  end

  module Mumbai
    HTTP = GraphQL::Client::HTTP.new("https://api.thegraph.com/subgraphs/name/talent-protocol/mumbai-dev-v3") do
      def headers(context)
        {"User-Agent": "Talent Protocol"}
      end
    end

    begin
      Schema = GraphQL::Client.load_schema(HTTP)

      Client = GraphQL::Client.new(schema: Schema, execute: HTTP)
    rescue KeyError, Net::ReadTimeout => error
      # This is a hack to get around the fact that the Mumbai subgraph is not available
      puts "Error loading Mumbai subgraph schema"
      Rollbar.error(
        error, "Error loading Mumbai subgraph schema"
      )
    end
  end

  module Polygon
    HTTP = GraphQL::Client::HTTP.new("https://api.thegraph.com/subgraphs/name/talent-protocol/polygon-prod-v3") do
      def headers(context)
        {"User-Agent": "Talent Protocol"}
      end
    end

    begin
      Schema = GraphQL::Client.load_schema(HTTP)

      Client = GraphQL::Client.new(schema: Schema, execute: HTTP)
    rescue KeyError, Net::ReadTimeout => error
      # This is a hack to get around the fact that the Polygon subgraph is not available
      puts "Error loading Polygon subgraph schema"
      Rollbar.error(
        error, "Error loading Polygon subgraph schema"
      )
    end
  end
end
