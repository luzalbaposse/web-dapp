module Discord
  class AccomplishedGoalNotification
    def initialize(goal:)
      @goal = goal
    end

    def call
      return unless goal.accomplished?
      return unless user.present?

      Faraday
        .post(
          ENV["DISCORD_ACCOMPLISHED_GOALS_CHANNEL_WEBHOOK_URL"].to_s,
          {content:}.to_json,
          {"Content-Type": "application/json"}
        )
    end

    private

    attr_reader :goal

    def user
      @user ||= goal.user
    end

    def content
      "_#{user.username}_#{" (#{user.legal_first_name})" if user.legal_first_name} just accomplished their goal: **#{goal.title}**. Check out their profile: https://beta.talentprotocol.com/u/#{user.username}"
    end
  end
end
