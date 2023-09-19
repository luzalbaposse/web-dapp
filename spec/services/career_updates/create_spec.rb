require "rails_helper"

RSpec.describe CareerUpdates::Create do
  let(:sender) { create :user }
  let(:message) { "Career update!" }
  let(:goal) { create :goal }
  let(:milestone) { create :milestone }

  subject(:create_career_update) do
    described_class.new(sender: sender, message: message, goals: [{id: goal.uuid}]).call
  end

  describe "#call" do
    it "creates the career update" do
      expect { create_career_update }.to change { CareerUpdate.count }.by(1)

      career_need = CareerUpdate.last

      aggregate_failures do
        expect(career_need.text).to eq(message)
        expect(career_need.user).to eq(sender)
      end
    end

    it "enqueues a job to broadcast the update" do
      expect { create_career_update }.to have_enqueued_job(BroadcastCareerUpdateJob)
    end

    it "associates the goals" do
      career_update = create_career_update

      expect(career_update.goals.first.id).to eq(goal.id)
    end
  end
end
