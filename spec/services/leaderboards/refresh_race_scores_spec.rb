require "rails_helper"

RSpec.describe Leaderboards::RefreshRaceScores do
  subject(:refresh_race_scores) { described_class.new(race: race).call }

  let(:race) { create :race, started_at: race_start, ends_at: race_end }

  let(:race_start) { Date.new(2023, 5, 1) }
  let(:race_end) { Time.current + 30.days }

  let(:refresh_user_score_class) { Leaderboards::RefreshUserScore }
  let(:refresh_user_score_instance) { instance_double(refresh_user_score_class, call: true) }

  let!(:inviter_one) { create :user }
  let!(:inviter_two) { create :user, onboarded_at: nil }
  let!(:inviter_three) { create :user }
  let!(:inviter_four) { create :user }
  let!(:inviter_five) { create :user }

  before do
    allow(refresh_user_score_class).to receive(:new).and_return(refresh_user_score_instance)

    create :invite, user: inviter_one, code: "test-1"
    create :invite, user: inviter_two, code: "test-2"
    create :invite, user: inviter_three, code: "test-3"
    create :invite, user: inviter_four, code: "test-4"
    create :invite, user: inviter_four, code: "test-5"
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
        user: inviter_three
      )
      expect(refresh_user_score_class).to have_received(:new).with(
        race: race,
        user: inviter_four
      )
      expect(refresh_user_score_instance).to have_received(:call).exactly(3).times
    end
  end

  context "when the race is before the accepted date" do
    let(:race_start) { Date.new(2023, 4, 1) }

    it "initializes and calls the refresh user score for all users with used invites" do
      expect { refresh_race_scores }.to raise_error(ArgumentError)
    end
  end
end
