require "rails_helper"

RSpec.describe V2Quest, type: :model do
  subject { build :v2_quest }

  describe "validations" do
    it { is_expected.to validate_presence_of(:participation_points_amount) }
    it { is_expected.to validate_presence_of(:title) }
    it { is_expected.to validate_presence_of(:description) }
    it { is_expected.to validate_uniqueness_of(:title) }
  end
end
