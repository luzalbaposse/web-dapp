require "rails_helper"

RSpec.describe SyncWithPersonaJob, type: :job do
  let(:user) { create :user }

  subject(:sync_with_persona) { SyncWithPersonaJob.perform_now }

  let(:fetch_inquiries_class) { WithPersona::FetchInquiries }
  let(:fetch_inquiries_service) { instance_double(fetch_inquiries_class, call: true) }

  before do
    allow(fetch_inquiries_class).to receive(:new).and_return(fetch_inquiries_service)
  end

  it "initializes and calls the sync persona refresh service with the correct arguments" do
    sync_with_persona

    aggregate_failures do
      expect(fetch_inquiries_class).to have_received(:new)
      expect(fetch_inquiries_service).to have_received(:call)
    end
  end
end
