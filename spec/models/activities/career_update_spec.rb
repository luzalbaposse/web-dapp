require "rails_helper"

RSpec.describe Activities::CareerUpdate do
  let(:activity) { described_class.new }

  describe ".generate_content" do
    it "returns nil" do
      expect(described_class.generate_content(nil, nil)).to be_nil
    end
  end

  describe ".default_global_scope" do
    it "returns false" do
      expect(described_class.default_global_scope).to be false
    end
  end

  describe "#message_with_names" do
    it "returns the message as is" do
      activity.message = "A sample message."
      expect(activity.message_with_names).to eq("A sample message.")
    end
  end
end
