require "rails_helper"

RSpec.describe Galxe::UploadWalletAddressesJob, type: :job do
  let(:uploader_class) { GoogleDrive::Galxe::UploadWalletAddresses }
  let(:uploader) { instance_double(uploader_class, call: true) }

  before do
    allow(uploader_class).to receive(:new).and_return(uploader)
  end

  subject { described_class }

  describe "#perform" do
    it "initializes and calls the Google Drive Galxe upload wallet address class" do
      subject.perform_now

      aggregate_failures do
        expect(uploader_class).to have_received(:new)
        expect(uploader).to have_received(:call)
      end
    end
  end
end
