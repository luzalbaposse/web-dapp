require "rails_helper"

RSpec.describe Activities::CareerNeedsUpdate do
  let(:activity) { described_class.new }

  describe ".generate_content" do
    it "returns nil" do
      expect(described_class.generate_content(nil, nil)).to be_nil
    end
  end

  describe ".default_global_scope" do
    it "returns true" do
      expect(described_class.default_global_scope).to be true
    end
  end
end
