module Leaderboards
  class RefreshUserScore
    def initialize(user:, race: Race.active_race)
      @race = race
      @user = user
    end

    def call
      score = User.where(invite_id: user.invites.pluck(:id)).where("created_at >= ? and created_at <= ?", race.started_at, race.ends_at).count

      if score.positive?
        leaderboard = Leaderboard.find_or_create_by!(
          race: race,
          user: user
        )
        leaderboard.update!(score: score)

        leaderboard
      end
    end

    private

    attr_reader :race, :user
  end
end
