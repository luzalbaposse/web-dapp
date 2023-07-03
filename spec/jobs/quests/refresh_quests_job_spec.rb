require "rails_helper"

RSpec.describe Quests::RefreshQuestsJob, type: :job do
  let(:user) { create :user }
  let(:notify) { true }

  subject(:refresh_quests) { Quests::RefreshQuestsJob.perform_now }

  let(:refresh_quests_class) { Quests::RefreshQuests }
  let(:refresh_quests_service) { instance_double(refresh_quests_class, call: true) }

  before do
    allow(refresh_quests_class).to receive(:new).and_return(refresh_quests_service)
  end

  it "initializes and calls the refresh quests service without arguments" do
    refresh_quests

    aggregate_failures do
      expect(refresh_quests_class).to have_received(:new)
      expect(refresh_quests_service).to have_received(:call)
    end
  end
end
