require "rails_helper"

RSpec.describe Quests::RefreshTalentMateQuestsJob, type: :job do
  subject(:refresh_talent_mate_quests) { Quests::RefreshTalentMateQuestsJob.perform_now }

  let(:refresh_user_quests_class) { Quests::RefreshUserQuest }
  let(:refresh_user_quests_service) { instance_double(refresh_user_quests_class, call: true) }
  let(:talent_one) { create :talent, verified: true }
  let(:talent_two) { create :talent, verified: false }

  let!(:user_one) { create :user, talent: talent_one }
  let!(:user_two) { create :user, talent: talent_two }

  let!(:quest) do
    create(
      :quest,
      title: "Create your Talent Mate",
      description: "Mint your mate NFT, exclusive for Talent Protocol verified members.",
      quest_type: "create_talent_mate",
      experience_points_amount: 750
    )
  end

  before do
    allow(refresh_user_quests_class).to receive(:new).and_return(refresh_user_quests_service)
  end

  it "initializes and calls the refresh quests service without arguments" do
    refresh_talent_mate_quests

    aggregate_failures do
      expect(refresh_user_quests_class).to have_received(:new).once.with(
        user: user_one,
        quest: quest
      )
      expect(refresh_user_quests_service).to have_received(:call).once
    end
  end
end
