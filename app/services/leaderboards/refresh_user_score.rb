module Leaderboards
  class RefreshUserScore
    def initialize(user:, race: Race.active_race)
      @race = race
      @user = user
    end

    def call
      return if user.admin?

      score = User.beginner_quest_completed
        .where(invite_id: user.invites.pluck(:id))
        .where("users.created_at >= ? and users.created_at <= ?", race.started_at, race.ends_at)
        .count

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
