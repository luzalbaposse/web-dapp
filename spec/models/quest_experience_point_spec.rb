require "rails_helper"

RSpec.describe QuestExperiencePoint, type: :model do
  let(:quest) { create :quest, quest_type: "active_goal" }

  subject { build :quest_experience_point, quest: }

  describe "associations" do
    it { is_expected.to belong_to(:quest) }
  end

  describe "validations" do
    it { is_expected.to validate_presence_of(:amount) }
    it { is_expected.to validate_uniqueness_of(:rule).scoped_to(:quest_id) }
  end
end
