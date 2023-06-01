require "rails_helper"

RSpec.describe Quests::RefreshUserQuests do
  subject(:refresh_user_quests) { described_class.new(user: user, notify: notify).call }

  let(:user) { create :user }
  let(:notify) { true }

  let(:refresh_user_quest_class) { Quests::RefreshUserQuest }
  let(:refresh_user_quest_instance) { instance_double(refresh_user_quest_class, call: true) }

  let!(:quest_one) { create :quest, quest_type: "profile_picture" }
  let!(:quest_two) { create :quest, quest_type: "three_journey_entries" }
  let!(:quest_three) { create :quest, quest_type: "send_career_update" }

  before do
    allow(refresh_user_quest_class).to receive(:new).and_return(refresh_user_quest_instance)
  end

  it "initializes and calls the refresh user quest for all quests" do
    refresh_user_quests

    aggregate_failures do
      expect(refresh_user_quest_class).to have_received(:new).with(
        user: user,
        quest: quest_one,
        notify: notify
      )
      expect(refresh_user_quest_class).to have_received(:new).with(
        user: user,
        quest: quest_two,
        notify: notify
      )
      expect(refresh_user_quest_class).to have_received(:new).with(
        user: user,
        quest: quest_three,
        notify: notify
      )
      expect(refresh_user_quest_instance).to have_received(:call).exactly(3).times
    end
  end
end
