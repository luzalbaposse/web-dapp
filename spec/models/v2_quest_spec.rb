require "rails_helper"

RSpec.describe V2Quest, type: :model do
  subject { build :v2_quest, quest_type: "profile_picture" }

  describe "validations" do
    it { is_expected.to validate_presence_of(:experience_points_amount) }
    it { is_expected.to validate_presence_of(:title) }
    it { is_expected.to validate_presence_of(:description) }
    it { is_expected.to validate_presence_of(:quest_type) }
    it { is_expected.to validate_uniqueness_of(:title) }
    it { is_expected.to validate_uniqueness_of(:quest_type) }
    it { is_expected.to validate_inclusion_of(:quest_type).in_array V2Quest::VALID_QUEST_TYPES }
  end
end
