require "rails_helper"

RSpec.describe Invite, type: :model do
  describe "validations" do
    describe "#one_associated_record" do
      let(:invite) { build :invite, organization:, partnership:, user: }

      before { invite.save }

      context "when there is a organization" do
        let(:organization) { create :community }
        let(:partnership) { nil }
        let(:user) { nil }

        it "does not add any errors to the invite" do
          expect(invite.errors.to_a).to be_empty
        end
      end

      context "when there is a partnership" do
        let(:organization) { nil }
        let(:partnership) { create :partnership }
        let(:user) { nil }

        it "does not add any errors to the invite" do
          expect(invite.errors.to_a).to be_empty
        end
      end

      context "when there is a user" do
        let(:organization) { nil }
        let(:partnership) { nil }
        let(:user) { create :user }

        it "does not add any errors to the invite" do
          expect(invite.errors.to_a).to be_empty
        end
      end

      context "when there is an organization, partnership and user" do
        let(:organization) { create :community }
        let(:partnership) { create :partnership }
        let(:user) { create :user }

        it "adds an error to the invite" do
          expect(invite.errors.to_a).to eq(["Only one association can be present"])
        end
      end

      context "when there is two associated records" do
        let(:organization) { create :community }
        let(:partnership) { create :partnership }
        let(:user) { nil }

        it "adds an error to the invite" do
          expect(invite.errors.to_a).to eq(["Only one association can be present"])
        end
      end

      context "when there is no organization, partnership or user" do
        let(:organization) { nil }
        let(:partnership) { nil }
        let(:user) { nil }

        it "adds an error to the invite" do
          expect(invite.errors.to_a).to eq(["Organization, partnership and user can't all be blank"])
        end
      end
    end
  end

  describe "#name" do
    context "when there is a organization" do
      let(:invite) { create :organization_invite, organization: }
      let(:organization) { create :community }

      it "returns the name of the organization" do
        expect(invite.name).to eq(organization.name)
      end
    end

    context "when there is a partnership" do
      let(:invite) { create :partnership_invite, partnership: }
      let(:partnership) { create :partnership }

      it "returns the name of the partnership" do
        expect(invite.name).to eq(partnership.name)
      end
    end

    context "when there is a user" do
      let(:invite) { create :invite, user: }
      let(:user) { create :user }

      it "returns the name of the user" do
        expect(invite.name).to eq(user.name)
      end
    end
  end

  describe "#profile_picture_url" do
    context "when there is an organization" do
      let(:invite) { create :organization_invite, organization: }
      let(:organization) { create :community }

      before do
        allow(organization).to receive(:logo_url).and_return("logo_url")
      end

      it "returns the logo url of the organization" do
        expect(invite.profile_picture_url).to eq("logo_url")
      end
    end

    context "when there is a partnership" do
      let(:invite) { create :partnership_invite, partnership: }
      let(:partnership) { create :partnership }

      before do
        allow(partnership).to receive(:logo_url).and_return("logo_url")
      end

      it "returns the logo url of the partnership" do
        expect(invite.profile_picture_url).to eq("logo_url")
      end
    end

    context "when there is a user" do
      let(:invite) { create :invite, user: }
      let(:user) { create :user }

      before do
        allow(user).to receive(:profile_picture_url).and_return("profile_picture_url")
      end

      it "returns the profile picture url of the user" do
        expect(invite.profile_picture_url).to eq("profile_picture_url")
      end
    end
  end
end
