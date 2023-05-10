require "rails_helper"

RSpec.describe Leaderboards::RefreshUserScore do
  subject(:refresh_score) { described_class.new(race: race, user: user).call }

  let(:race) { create :race, started_at: race_start, ends_at: race_end }
  let(:user) { create :user }

  let!(:invite) { create :invite, user: user, code: "test" }

  let(:race_start) { Date.new(2023, 5, 1) }
  let(:race_end) { Time.current + 10.days }

  context "when the user invite was not used" do
    it "does not create a new leaderboard" do
      expect { refresh_score }.not_to change(Leaderboard, :count)
    end
  end

  context "when the user invite was used" do
    context "when it was used outside the passed race" do
      before do
        create :user, invite_id: invite.id, onboarded_at: race_start - 40.days
        create :user, invite_id: invite.id, onboarded_at: race_start - 21.days
      end

      it "does not create a new leaderboard" do
        expect { refresh_score }.not_to change(Leaderboard, :count)
      end
    end

    context "when it was used inside the passed race" do
      before do
        create :user, invite_id: invite.id, onboarded_at: race_start + 2.days
        create :user, invite_id: invite.id, onboarded_at: race_start
        create :user, invite_id: invite.id, onboarded_at: race_end
        create :user, invite_id: invite.id, onboarded_at: race_start - 2.days
        create :user, onboarded_at: nil, invite_id: invite.id
      end

      it "creates a new leaderboard" do
        expect { refresh_score }.to change(Leaderboard, :count).from(0).to(1)
      end

      it "returns the created leaderboard" do
        leaderboard = refresh_score

        expect(leaderboard.race).to eq race
        expect(leaderboard.user).to eq user
        expect(leaderboard.score).to eq 3
      end

      context "when the user is an admin" do
        let(:user) { create :user, role: "admin" }

        it "does not create a new leaderboard" do
          expect { refresh_score }.not_to change(Leaderboard, :count)
        end
      end
    end
  end

  context "when the race is before the accepted date" do
    let(:race_start) { Date.new(2023, 4, 1) }

    it "initializes and calls the refresh user score for all users with used invites" do
      expect { refresh_score }.to raise_error(ArgumentError)
    end
  end
end
