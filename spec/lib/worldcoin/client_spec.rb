require "worldcoin/client"
require "rails_helper"

RSpec.describe Worldcoin::Client do
  let(:client) { described_class.new }

  describe "#verify" do
    let(:request_url) { "#{described_class::BASE_URI}/api/v1/verify/app_id" }
    let(:proof) { {} }

    before do
      stub_const("Worldcoin::Client::APP_ID", "app_id")

      stub_request(:post, request_url)
    end

    it "makes a request to verify the proof" do
      client.verify(proof: proof)

      expect(
        a_request(:post, request_url)
      )
        .to have_been_made
        .once
    end
  end
end
