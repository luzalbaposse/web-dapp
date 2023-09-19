require "rails_helper"

RSpec.describe Discord::AppliedToTakeoffNotificationJob, type: :job do
  include ActiveJob::TestHelper

  let(:goal_id) { goal.id }
  let(:goal) { create :goal }

  let(:notification_class) { Discord::AppliedToTakeoffNotification }
  let(:notification) { instance_double(notification_class, call: nil) }

  before do
    allow(notification_class).to receive(:new).and_return(notification)
  end

  subject { described_class.new }

  describe "#perform" do
    it "initializes and calls the Discord takeoff application notification with the goal" do
      subject.perform(goal_id)

      aggregate_failures do
        expect(notification_class).to have_received(:new).with(goal:)
        expect(notification).to have_received(:call)
      end
    end
  end
end
