require "rails_helper"

RSpec.describe Organizations::Create do
  subject(:create_organization) do
    described_class.new(params:, users: [user_one, user_two], max_invite_uses:).call
  end

  let(:max_invite_uses) { 4 }

  let(:params) do
    {
      description: "Leading multi-chain payments technology.",
      location: "Lisbon, Portugal",
      name: "Utrust",
      tags: [tag_one, tag_two],
      type: "Organizations::Team",
      verified: true,
      website: "https://utrust.com/"
    }
  end

  let(:tag_one) { create :tag }
  let(:tag_two) { create :tag }

  let(:user_one) { create :user }
  let(:user_two) { create :user }

  let(:invites_create_class) { Invites::Create }
  let(:invites_create) { instance_double(invites_create_class, call: true) }

  before do
    allow(invites_create_class).to receive(:new).and_return(invites_create)
  end

  describe "#call" do
    it "creates an organization" do
      expect { create_organization }.to change(Organization, :count).from(0).to(1)

      organization = Organization.last

      aggregate_failures do
        expect(organization.description).to eq("Leading multi-chain payments technology.")
        expect(organization.location).to eq("Lisbon, Portugal")
        expect(organization.name).to eq("Utrust")
        expect(organization.tags).to eq([tag_one, tag_two])
        expect(organization.slug).to eq("utrust")
        expect(organization.type).to eq("Organizations::Team")
        expect(organization.verified).to eq(true)
        expect(organization.website).to eq("https://utrust.com/")
      end
    end

    it "initialises and calls the invite create with the correct arguments" do
      organization = create_organization

      aggregate_failures do
        expect(invites_create_class).to have_received(:new).with(max_uses: max_invite_uses, organization:)
        expect(invites_create).to have_received(:call)
      end
    end

    it "creates an active organization membership for each of the users" do
      expect { create_organization }.to change(Membership, :count).from(0).to(2)

      organization = Organization.last

      aggregate_failures do
        expect(Membership.exists?(active: true, organization:, user: user_one)).to eq(true)
        expect(Membership.exists?(active: true, organization:, user: user_two)).to eq(true)
      end
    end

    context "when the params are not valid" do
      let(:params) { {name: nil} }

      it "raises an error" do
        expect { create_organization }.to raise_error(
          described_class::CreationError,
          "Unable to create organization. Errors: Name can't be blank, Slug can't be blank"
        )
      end
    end
  end
end
