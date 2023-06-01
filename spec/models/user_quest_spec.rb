require "rails_helper"

RSpec.describe UserQuest, type: :model do
  subject { build :user_quest, user_id: create(:user).id, quest_id: create(:quest, quest_type: "profile_picture").id }

  describe "associations" do
    it { is_expected.to belong_to(:user) }
    it { is_expected.to belong_to(:quest) }
  end

  describe "validations" do
    it { is_expected.to validate_presence_of(:completed_at) }
    it { is_expected.to validate_presence_of(:credited_experience_points_amount) }
    it { is_expected.to validate_uniqueness_of(:user_id).scoped_to(:quest_id) }
  end
end
