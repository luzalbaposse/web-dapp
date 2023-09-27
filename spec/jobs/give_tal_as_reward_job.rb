require "rails_helper"

RSpec.describe GiveTalAsRewardJob, type: :job do
  let(:chain_id) { "chain ID" }
  let(:amount) { 1000 }
  let(:to) { SecureRandom.hex }

  subject(:talent_supporters_refresh) { GiveTalAsRewardJob.perform_now(chain_id: chain_id, amount: amount, to: to) }

  let(:mint_virtual_tal_class) { Web3::MintVirtualTal }
  let(:mint_virtual_tal_service) { instance_double(mint_virtual_tal_class, call: true) }

  before do
    allow(mint_virtual_tal_class).to receive(:new).and_return(mint_virtual_tal_service)
  end

  it "initializes and calls the talent supporters refresh service with the correct arguments" do
    talent_supporters_refresh

    aggregate_failures do
      expect(mint_virtual_tal_class).to have_received(:new).with(chain_id: chain_id)
      expect(mint_virtual_tal_service).to have_received(:call)
    end
  end
end
