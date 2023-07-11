require "rails_helper"

RSpec.describe Organization, type: :model do
  describe "associations" do
    it { is_expected.to have_many(:invites) }
    it { is_expected.to have_many(:memberships) }
    it { is_expected.to have_many(:organization_tags) }
    it { is_expected.to have_many(:tags).through(:organization_tags) }
    it { is_expected.to have_many(:users).through(:memberships) }
  end

  describe "validations" do
    subject { build :community }

    it do
      is_expected
        .to allow_values("https://foo.com", "http://bar.com", "")
        .for(:discord)
    end

    it { is_expected.not_to allow_values("foo", "buz").for(:discord) }

    it do
      is_expected
        .to allow_values("https://foo.com", "http://bar.com", "")
        .for(:github)
    end

    it { is_expected.not_to allow_values("foo", "buz").for(:github) }

    it do
      is_expected
        .to allow_values("https://foo.com", "http://bar.com", "")
        .for(:linkedin)
    end

    it { is_expected.not_to allow_values("foo", "buz").for(:linkedin) }

    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_uniqueness_of(:name) }
    it { is_expected.to validate_uniqueness_of(:slug) }

    it do
      is_expected
        .to allow_values("https://foo.com", "http://bar.com", "")
        .for(:telegram)
    end

    it { is_expected.not_to allow_values("foo", "buz").for(:telegram) }

    it do
      is_expected
        .to allow_values("https://foo.com", "http://bar.com", "")
        .for(:twitter)
    end

    it { is_expected.not_to allow_values("foo", "buz").for(:twitter) }

    it do
      is_expected
        .to allow_values("https://foo.com", "http://bar.com", "")
        .for(:website)
    end

    it { is_expected.not_to allow_values("foo", "buz").for(:website) }
  end

  describe "Single Table Inheritance" do
    let(:team) { create(:team) }
    let(:community) { create(:community) }

    it "creates a Team" do
      expect(team.type).to eq("Organizations::Team")
    end

    it "creates a Community" do
      expect(community.type).to eq("Organizations::Community")
    end
  end

  describe "#slug" do
    subject { build :community, name: "Utrust" }

    it "generates a slug based on the name on save" do
      subject.save!

      expect(subject.slug).to eq("utrust")
    end
  end
end
