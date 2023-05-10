module Leaderboards
  class RefreshRaceScores
    def initialize(race: Race.active_race)
      @race = race
    end

    def call
      users_with_used_invites.find_each do |user|
        Leaderboards::RefreshUserScore.new(race: race, user: user).call
      end
    end

    private

    attr_reader :race

    def users_with_used_invites
      invite_ids = User
        .beginner_quest_completed
        .where.not(invite_id: nil)
        .where("users.created_at >= ? and users.created_at <= ?", race.started_at, race.ends_at)
        .pluck(:invite_id)

      user_ids = Invite.where(id: invite_ids).distinct.pluck(:user_id)
      User.where(id: user_ids)
    end
  end
end
