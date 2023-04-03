require "rails_helper"

RSpec.describe CareerUpdate, type: :model do
  subject { build :career_update, user: build(:user) }

  describe "associations" do
    it { is_expected.to belong_to(:user) }
  end

  describe "validations" do
    it { is_expected.to validate_presence_of(:text_ciphertext) }
  end
end
