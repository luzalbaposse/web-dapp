require "rails_helper"

RSpec.describe DeductTalForVoteJob, type: :job do
  let(:vote) { create :vote }
  let(:chain_id) { "chain ID" }

  subject(:talent_supporters_refresh) { DeductTalForVoteJob.perform_now(vote_id: vote.id, chain_id: chain_id) }

  let(:burn_virtual_tal_class) { Web3::BurnVirtualTal }
  let(:burn_virtual_tal_service) { instance_double(burn_virtual_tal_class, call: true) }

  before do
    allow(burn_virtual_tal_class).to receive(:new).and_return(burn_virtual_tal_service)
  end

  it "initializes and calls the talent supporters refresh service with the correct arguments" do
    talent_supporters_refresh

    aggregate_failures do
      expect(burn_virtual_tal_class).to have_received(:new).with(chain_id: chain_id)
      expect(burn_virtual_tal_service).to have_received(:call)
    end
  end
end
