require "web3_api/moralis/client"
require "web3_api/celo_explorer/client"
require "web3_api/api_proxy"
require "rails_helper"

RSpec.shared_examples "a celo explorer client get transactions count request" do
  let(:client_class) { Web3Api::CeloExplorer::Client }
  let(:client) { instance_double(client_class) }

  before do
    allow(client_class).to receive(:new).and_return(client)
    allow(client).to receive(:retrieve_transactions).and_return(response)
  end

  let(:response) do
    OpenStruct.new(
      success?: response_success,
      body: file_fixture("celo_explorer_get_transactions_response.json").read
    )
  end
  let(:response_success) { true }

  it "initializes and calls the moralis client with the correct arguments" do
    request

    expect(client_class).to have_received(:new)
    expect(client).to have_received(:retrieve_transactions).with(
      address: wallet_address,
      start_timestamp: start_timestamp,
      end_timestamp: nil
    )
  end

  it "returns the count of transactions" do
    expect(request).to eq(2)
  end

  context "when the request is not successful" do
    let(:response_success) { false }

    it "raises an api client error" do
      expect { request }.to raise_error(described_class::ApiClientRequestError)
    end
  end
end

RSpec.shared_examples "a moralis client get transactions count request" do
  let(:client_class) { Web3Api::Moralis::Client }
  let(:client) { instance_double(client_class) }

  before do
    allow(client_class).to receive(:new).and_return(client)
    allow(client).to receive(:retrieve_transactions).and_return(response)
  end

  let(:response) do
    OpenStruct.new(
      success?: response_success,
      body: file_fixture("moralis_get_transactions_response.json").read
    )
  end
  let(:response_success) { true }

  it "initializes and calls the moralis client with the correct arguments" do
    request

    expect(client_class).to have_received(:new)
    expect(client).to have_received(:retrieve_transactions).with(
      address: wallet_address,
      start_timestamp: start_timestamp,
      end_timestamp: nil,
      chain: formatted_chain
    )
  end

  it "returns a the total number of transactions" do
    expect(request).to eq(1000)
  end

  context "when the request is not successful" do
    let(:response_success) { false }

    it "raises an api client error" do
      expect { request }.to raise_error(described_class::ApiClientRequestError)
    end
  end
end

RSpec.shared_examples "an unsupported chain request" do
  it "raises an unsupported chain error" do
    expect { request }.to raise_error(described_class::UnsupportedChainError)
  end
end

RSpec.describe Web3Api::ApiProxy do
  let(:wallet_address) { SecureRandom.hex }
  let(:api_proxy) { described_class.new }
  let(:start_timestamp) { Time.now.to_i }

  describe "#retrieve_polygon_nfts_count" do
    subject(:request) { api_proxy.retrieve_polygon_nfts_count(address: wallet_address) }

    let(:client_class) { Web3Api::Moralis::Client }
    let(:client) { instance_double(client_class) }

    before do
      allow(client_class).to receive(:new).and_return(client)
      allow(client).to receive(:retrieve_contract_nfts).and_return(response)
    end

    let(:response) do
      OpenStruct.new(
        success?: response_success,
        body: file_fixture("moralis_get_contract_nfts_response.json").read
      )
    end
    let(:response_success) { true }

    it "initializes and calls the moralis client with the correct arguments" do
      request

      expect(client_class).to have_received(:new)
      expect(client).to have_received(:retrieve_contract_nfts).with(
        contract_address: wallet_address,
        chain: "polygon"
      )
    end

    it "returns a the total number of nfts" do
      expect(request).to eq(1294)
    end

    context "when the request is not successful" do
      let(:response_success) { false }

      it "raises an api client error" do
        expect { request }.to raise_error(described_class::ApiClientRequestError)
      end
    end
  end

  describe "#retrieve_transactions count" do
    subject(:request) { api_proxy.retrieve_transactions_count(address: wallet_address, start_timestamp: start_timestamp, chain: chain) }

    context "when the chain matches ethereum network" do
      context "when the chain is eth" do
        let(:chain) { "eth" }
        let(:formatted_chain) { "eth" }

        it_behaves_like "a moralis client get transactions count request"
      end

      context "when the chain is 1" do
        let(:chain) { 1 }
        let(:formatted_chain) { "0x1" }

        it_behaves_like "a moralis client get transactions count request"
      end

      context "when the chain is 0x1" do
        let(:chain) { "0x1" }
        let(:formatted_chain) { "0x1" }

        it_behaves_like "a moralis client get transactions count request"
      end
    end

    context "when the chain matches the polygon network" do
      let(:chain) { "polygon" }

      context "when the chain is polygon" do
        let(:chain) { "polygon" }
        let(:formatted_chain) { "polygon" }

        it_behaves_like "a moralis client get transactions count request"
      end

      context "when the chain is 0x89" do
        let(:chain) { "0x89" }
        let(:formatted_chain) { "0x89" }

        it_behaves_like "a moralis client get transactions count request"
      end

      context "when the chain is 137" do
        let(:chain) { 137 }
        let(:formatted_chain) { "0x89" }

        it_behaves_like "a moralis client get transactions count request"
      end
    end

    context "when the chain matches the celo network" do
      let(:chain) { "celo" }

      context "when the chain is celo" do
        let(:chain) { "celo" }

        it_behaves_like "a celo explorer client get transactions count request"
      end

      context "when the chain is 0xa4ec" do
        let(:chain) { "0xa4ec" }

        it_behaves_like "a celo explorer client get transactions count request"
      end

      context "when the chain is 42220" do
        let(:chain) { 42220 }

        it_behaves_like "a celo explorer client get transactions count request"
      end
    end

    context "when the chain is not yet supported" do
      let(:chain) { "bsc" }

      it_behaves_like "an unsupported chain request", :retrieve_transactions_count
    end
  end
end
