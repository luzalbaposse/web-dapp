require "rails_helper"

RSpec.describe Quests::RefreshQuests do
  subject(:refresh_quests) { described_class.new.call }

  let(:refresh_quest_class) { Quests::RefreshUserQuest }
  let(:refresh_quest_instance) { instance_double(refresh_quest_class, call: true) }

  let!(:quest_one) { create :quest, quest_type: "profile_picture", new: false, created_at: 31.days.ago }
  let!(:quest_two) { create :quest, quest_type: "three_journey_entries", new: true, created_at: Time.current }
  let!(:quest_three) { create :quest, quest_type: "send_career_update", new: true, created_at: 31.days.ago }

  before do
    allow(refresh_quest_class).to receive(:new).and_return(refresh_quest_instance)
  end

  it "initializes and calls the refresh quests service for quests created more than 30 days ago" do
    refresh_quests

    aggregate_failures do
      expect(quest_one.reload.new).to eq false
      expect(quest_two.reload.new).to eq true
      expect(quest_three.reload.new).to eq false
    end
  end
end
