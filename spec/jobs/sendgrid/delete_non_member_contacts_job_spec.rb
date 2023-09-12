require "rails_helper"

RSpec.describe Sendgrid::DeleteNonMemberContactsJob, type: :job do
  include ActiveJob::TestHelper

  let(:delete_class) { Sendgrid::Contacts::Delete }
  let(:delete) { instance_double(delete_class, call: nil) }

  before do
    allow(delete_class).to receive(:new).and_return(delete)

    create :user, email: "user-one@gmail.com", last_access_at: Date.current - 181.days
    create :user, email: "user-two@gmail.com", last_access_at: Date.current - 182.days
    create :user, email: "user-three@gmail.com", last_access_at: Date.current - 183.days
  end

  subject { described_class.new }

  describe "#perform" do
    it "initializes and calls the SendGrid contacts delete with the email of non members" do
      subject.perform

      aggregate_failures do
        expect(delete_class)
          .to have_received(:new)
          .with(emails: ["user-one@gmail.com"])

        expect(delete).to have_received(:call)
      end
    end
  end
end
