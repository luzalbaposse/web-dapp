require "rails_helper"

RSpec.describe Activities::TokenLaunch do
  let(:origin_user) { create(:user, :with_talent_token) }
  let(:activity) { described_class.new(origin_user_id: origin_user.id) }

  describe ".generate_content" do
    it "returns the correct content" do
      origin_user.talent.talent_token.ticker = "TKR"
      origin_user.talent.talent_token.save!
      expected_content = "@origin just launched their token $TKR."
      expect(described_class.generate_content(origin_user.id, nil)).to eq(expected_content)
    end
  end

  describe ".default_global_scope" do
    it "returns true" do
      expect(described_class.default_global_scope).to be true
    end
  end

  describe "#message_with_names" do
    it "returns the message with the user name" do
      origin_user.display_name = "Test User"
      origin_user.save!
      activity.message = "@origin just launched their token."
      expected_message = "Test User just launched their token."
      expect(activity.message_with_names).to eq(expected_message)
    end
  end
end
