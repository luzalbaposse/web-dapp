require "rails_helper"

RSpec.describe Web3::EnsDomainOwner do
  subject(:get_ens_domain_owner) { described_class.new(domain: domain).call }

  let(:domain) { "dinis.tal.community" }
  let(:contract_env) { "production" }

  let(:eth_client_class) { Eth::Client }
  let(:provider) { instance_double(eth_client_class) }

  let(:eth_ens_client_class) { Eth::Ens::Resolver }
  let(:ens_client) { instance_double(eth_ens_client_class) }

  before do
    allow(eth_client_class).to receive(:create).and_return(provider)
    allow(eth_ens_client_class).to receive(:new).and_return(ens_client)
    allow(ens_client).to receive(:owner).and_return(address)
    ENV["CONTRACTS_ENV"] = contract_env
  end

  let(:address) { SecureRandom.hex }

  it "initializes the eth provider" do
    get_ens_domain_owner

    expect(eth_client_class).to have_received(:create).with(
      described_class::MAINNET_PROVIDER_URL
    )
  end

  it "initializes the ens client" do
    get_ens_domain_owner

    expect(eth_ens_client_class).to have_received(:new).with(
      provider
    )
  end

  it "returns the owner address" do
    expect(get_ens_domain_owner).to eq(address)
  end

  context "when the env is not production" do
    let(:contract_env) { "staging" }

    it "initializes the eth provider on goerli" do
      get_ens_domain_owner

      expect(eth_client_class).to have_received(:create).with(
        described_class::GOERLI_PROVIDER_URL
      )
    end

    it "returns the owner address" do
      expect(get_ens_domain_owner).to eq(address)
    end
  end
end
