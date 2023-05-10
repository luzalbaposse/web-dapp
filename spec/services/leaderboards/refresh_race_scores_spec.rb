require "rails_helper"

RSpec.describe Leaderboards::RefreshRaceScores do
  subject(:refresh_race_scores) { described_class.new(race: race).call }

  let(:race) { create :race, started_at: race_start, ends_at: race_end }

  let(:race_start) { Time.current - 20.days }
  let(:race_end) { Time.current + 10.days }

  let(:refresh_user_score_class) { Leaderboards::RefreshUserScore }
  let(:refresh_user_score_instance) { instance_double(refresh_user_score_class, call: true) }

  let!(:inviter_one) { create :user }
  let!(:inviter_two) { create :user }
  let!(:inviter_three) { create :user }
  let!(:inviter_four) { create :user }
  let!(:inviter_five) { create :user }

  before do
    allow(refresh_user_score_class).to receive(:new).and_return(refresh_user_score_instance)

    invite_one = create :invite, user: inviter_one, code: "test-1"
    invite_two = create :invite, user: inviter_two, code: "test-2"
    invite_three = create :invite, user: inviter_three, code: "test-3"
    invite_four = create :invite, user: inviter_four, code: "test-4"
    invite_five = create :invite, user: inviter_four, code: "test-5"

    create :user, :with_beginner_quest_complete, invite_id: invite_one.id, created_at: race_start
    create :user, :with_beginner_quest_complete, invite_id: invite_two.id, created_at: Time.current - 10.days
    create :user, :with_beginner_quest_complete, invite_id: invite_three.id, created_at: race_end
    create :user, invite_id: invite_four.id, created_at: Time.current - 30.days
    create :user, invite_id: invite_four.id, created_at: Time.current + 15.days
    create :user, invite_id: invite_five.id, created_at: Time.current
  end

  it "initializes and calls the refresh user score for all users with used invites" do
    refresh_race_scores

    aggregate_failures do
      expect(refresh_user_score_class).to have_received(:new).with(
        race: race,
        user: inviter_one
      )
      expect(refresh_user_score_class).to have_received(:new).with(
        race: race,
        user: inviter_two
      )
      expect(refresh_user_score_class).to have_received(:new).with(
        race: race,
        user: inviter_three
      )
      expect(refresh_user_score_instance).to have_received(:call).exactly(3).times
    end
  end
end
