require "rails_helper"

RSpec.describe Leaderboard, type: :model do
  subject { build :leaderboard, race: build(:race), user: build(:user) }

  describe "associations" do
    it { is_expected.to belong_to(:user) }
    it { is_expected.to belong_to(:race) }
  end

  describe "validations" do
    it { is_expected.to validate_presence_of(:score) }
  end
end
