module Leaderboards
  class RefreshRaceScores
    def initialize(race: Race.active_race)
      # Since 2023/05/01 we started counting only onboarded users as valid invites
      raise ArgumentError, "Only available for races started after 2023/05/01" if race.started_at < Date.new(2023, 5, 1)

      @race = race
    end

    def call
      onboarded_users_with_invites.find_each do |user|
        Leaderboards::RefreshUserScore.new(race: race, user: user).call
      end
    end

    private

    attr_reader :race

    def onboarded_users_with_invites
      User.onboarded.joins(:invites).distinct
    end
  end
end
