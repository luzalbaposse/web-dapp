require "rails_helper"

RSpec.describe ExperiencePoint, type: :model do
  describe "associations" do
    it { is_expected.to belong_to(:user) }
    it { is_expected.to belong_to(:source) }
  end

  describe "validations" do
    subject { build :experience_point }

    it { is_expected.to validate_presence_of(:amount) }
    it { is_expected.to validate_presence_of(:credited_at) }
    it { is_expected.to validate_presence_of(:description) }
  end
end
