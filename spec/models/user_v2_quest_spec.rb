require "rails_helper"

RSpec.describe UserV2Quest, type: :model do
  subject { build :user_v2_quest, user_id: create(:user).id, v2_quest_id: create(:v2_quest, quest_type: "profile_picture").id }

  describe "associations" do
    it { is_expected.to belong_to(:user) }
    it { is_expected.to belong_to(:v2_quest) }
  end

  describe "validations" do
    it { is_expected.to validate_presence_of(:completed_at) }
    it { is_expected.to validate_presence_of(:credited_amount) }
    it { is_expected.to validate_uniqueness_of(:user_id).scoped_to(:v2_quest_id) }
  end
end
