require "rails_helper"

RSpec.describe Subscriber, type: :model do
  describe "associations" do
    it { is_expected.to belong_to(:user) }
    it { is_expected.to belong_to(:subscriber) }
  end
end
