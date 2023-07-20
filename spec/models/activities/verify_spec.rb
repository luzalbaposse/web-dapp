require "rails_helper"

RSpec.describe Activities::Verify do
  let(:origin_user) { create(:user, :with_talent_token) }
  let(:activity) { described_class.new(origin_user_id: origin_user.id) }

  describe ".generate_content" do
    it "returns the correct content" do
      expected_content = "@origin is now a verified user."
      expect(described_class.generate_content(origin_user.id, nil)).to eq(expected_content)
    end
  end

  describe ".default_global_scope" do
    it "returns true" do
      expect(described_class.default_global_scope).to be true
    end
  end
end
