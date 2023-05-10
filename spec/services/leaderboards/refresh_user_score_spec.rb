require "rails_helper"

RSpec.describe Leaderboards::RefreshUserScore do
  subject(:refresh_score) { described_class.new(race: race, user: user).call }

  let(:race) { create :race, started_at: race_start, ends_at: race_end }
  let(:user) { create :user }

  let!(:invite) { create :invite, user: user, code: "test" }

  let(:race_start) { Time.current - 20.days }
  let(:race_end) { Time.current + 10.days }

  context "when the user invite was not used" do
    it "does not create a new leaderboard" do
      expect { refresh_score }.not_to change(Leaderboard, :count)
    end
  end

  context "when the user invite was used" do
    context "when it was used outside the passed race" do
      before do
        create :user, invite_id: invite.id, created_at: Time.current - 40.days
        create :user, invite_id: invite.id, created_at: Time.current - 21.days
      end

      it "does not create a new leaderboard" do
        expect { refresh_score }.not_to change(Leaderboard, :count)
      end
    end

    context "when it was used inside the passed race" do
      before do
        create :user, :with_beginner_quest_complete, invite_id: invite.id, created_at: Time.current - 40.days
        create :user, :with_beginner_quest_complete, invite_id: invite.id, created_at: Time.current - 19.days
        create :user, :with_beginner_quest_complete, invite_id: invite.id, created_at: Time.current
        create :user, :with_beginner_quest_complete, invite_id: invite.id, created_at: Time.current + 9.days
        create :user, invite_id: invite.id, created_at: Time.current + 2
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
end
