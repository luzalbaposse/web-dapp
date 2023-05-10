module Leaderboards
  class RefreshUserScore
    def initialize(user:, race: Race.active_race)
      # Since 2023/05/01 we started counting only onboarded users as valid invites
      raise ArgumentError, "Only available for races started after 2023/05/01" if race.started_at < Date.new(2023, 5, 1)

      @race = race
      @user = user
    end

    def call
      return if user.admin?

      score = User
        .where(invite_id: user.invites.pluck(:id))
        .where("users.onboarded_at >= ? and users.onboarded_at <= ?", race.started_at, race.ends_at)
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
