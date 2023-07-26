require "rails_helper"

RSpec.describe Activities::ProfileComplete do
  let(:origin_user) { create(:user) }
  let(:activity) { described_class.new(origin_user_id: origin_user.id) }

  describe ".generate_content" do
    it "returns the correct content" do
      expected_content = "@origin joined Talent Protocol."
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

    it "returns the message with the user name" do
      activity.message = "@origin joined Talent Protocol."
      expected_message = "Origin User joined Talent Protocol."
      expect(activity.message_with_names).to eq(expected_message)
    end
  end
end
