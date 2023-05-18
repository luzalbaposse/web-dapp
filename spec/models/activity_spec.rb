require "rails_helper"

RSpec.describe Activity, type: :model do
  subject { build :activity }

  describe "associations" do
    it { is_expected.to belong_to(:origin_user) }
    it { is_expected.to belong_to(:target_user).optional(true) }
  end

  describe "validations" do
    it { is_expected.to validate_presence_of(:type) }
  end
end
