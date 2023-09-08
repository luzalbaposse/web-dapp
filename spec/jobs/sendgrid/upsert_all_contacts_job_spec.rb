require "rails_helper"

RSpec.describe Sendgrid::UpsertAllContactsJob, type: :job do
  include ActiveJob::TestHelper

  let(:upsert_class) { Sendgrid::Contacts::Upsert }
  let(:upsert) { instance_double(upsert_class, call: nil) }

  before do
    allow(upsert_class).to receive(:new).and_return(upsert)
  end

  subject { described_class.new }

  describe "#perform" do
    it "initialises and calls the SendGrid contacts upsert" do
      subject.perform

      aggregate_failures do
        expect(upsert_class).to have_received(:new)
        expect(upsert).to have_received(:call)
      end
    end
  end
end
