require "rails_helper"

RSpec.describe Activities::GoalUpdate do
  let(:origin_user) { create(:user) }
  let(:activity) { described_class.new(origin_user_id: origin_user.id) }

  describe ".generate_content" do
    it "returns the correct content" do
      expected_content = "@origin just updated their career goal."
      expect(described_class.generate_content(nil, nil)).to eq(expected_content)
    end
  end

  describe ".default_global_scope" do
    it "returns true" do
      expect(described_class.default_global_scope).to be true
    end
  end
end
