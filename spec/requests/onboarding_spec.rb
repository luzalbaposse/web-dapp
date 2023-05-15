require "rails_helper"

RSpec.describe "Onboarding", type: :request do
  describe "#finish" do
    subject(:finish_onboarding) { post finish_path(params: params, as: current_user) }

    let(:current_user) { create :user, :with_talent, onboarded_at: nil }

    let(:params) do
      {
        occupation: "Engineer",
        experienceLevel: 3,
        nationality: "Portuguese",
        location: "Lisbon",
        gender: "female",
        headline: "I'm great at testing",
        tags: ["web3", "software"],
        career_needs: ["Full-time roles"],
        legal_first_name: "Test",
        legal_last_name: "Dinis"
      }
    end

    let(:career_needs_upsert_class) { CareerNeeds::Upsert }
    let(:career_needs_upsert) { instance_double(career_needs_upsert_class, call: true) }

    let(:refresh_user_score_class) { Leaderboards::RefreshUserScore }
    let(:refresh_user_score_instance) { instance_double(refresh_user_score_class, call: true) }

    before do
      allow(career_needs_upsert_class).to receive(:new).and_return(career_needs_upsert)
      allow(refresh_user_score_class).to receive(:new).and_return(refresh_user_score_instance)
    end

    it "returns a successful response" do
      finish_onboarding

      expect(response).to have_http_status(:created)
    end

    it "marks the user as onboarded" do
      freeze_time do
        finish_onboarding

        expect(current_user.reload.onboarded_at).to eq(Time.zone.now)
      end
    end

    it "updates the talent record" do
      finish_onboarding

      talent = current_user.talent.reload
      aggregate_failures do
        expect(talent.occupation).to eq "Engineer"
        expect(talent.experience_level).to eq 3
        expect(talent.nationality).to eq "Portuguese"
        expect(talent.location).to eq "Lisbon"
        expect(talent.gender).to eq "female"
        expect(talent.headline).to eq "I'm great at testing"
      end
    end

    it "updates the user record" do
      finish_onboarding

      user = current_user.reload
      aggregate_failures do
        expect(user.legal_first_name).to eq "Test"
        expect(user.legal_last_name).to eq "Dinis"
      end
    end

    it "initialises and calls the career needs upsert class with the correct arguments" do
      finish_onboarding

      aggregate_failures do
        expect(career_needs_upsert_class)
          .to have_received(:new)
          .with(career_goal: current_user.talent&.career_goal, titles: ["Full-time roles"])

        expect(career_needs_upsert).to have_received(:call)
      end
    end

    context "when the onboarded user was invited by another user" do
      let(:inviter) { create :user }
      let!(:invite) { create :invite, user: inviter }

      let!(:current_user) { create :user, :with_talent, onboarded_at: nil, invite_id: invite.id }

      it "initializes and calls the refresh user score for all users with used invites" do
        finish_onboarding

        aggregate_failures do
          expect(refresh_user_score_class).to have_received(:new).with(
            user: inviter
          )
          expect(refresh_user_score_instance).to have_received(:call)
        end
      end
    end
  end
end
