require "rails_helper"

RSpec.describe Activities::Subscribe do
  let(:origin_user) { create(:user) }
  let(:target_user) { create(:user) }
  let(:activity) { described_class.new(origin_user_id: origin_user.id, target_user_id: target_user.id) }

  describe ".generate_content" do
    it "returns the correct content" do
      expected_content = "@origin just started subscribing to @target."
      expect(described_class.generate_content(nil, nil)).to eq(expected_content)
    end
  end

  describe ".default_global_scope" do
    it "returns true" do
      expect(described_class.default_global_scope).to be true
    end
  end

  describe "#message_with_names" do
    let(:origin_user) { create(:user, display_name: "Origin User") }
    let(:target_user) { create(:user, display_name: "Target User") }

    it "returns the message with the user names" do
      activity.message = "@origin just started subscribing to @target."
      expected_message = "Origin User just started subscribing to Target User."
      expect(activity.message_with_names).to eq(expected_message)
    end
  end
end
