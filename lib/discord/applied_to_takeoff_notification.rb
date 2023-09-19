module Discord
  class AppliedToTakeoffNotification
    def initialize(goal:)
      @goal = goal
    end

    def call
      return unless goal.election.present?
      return unless user.present?
      return unless organization.present? && organization.slug == "takeoff-istanbul"

      Faraday
        .post(
          ENV["DISCORD_TAKEOFF_APPLICATIONS_WEBHOOK_URL"].to_s,
          {content:}.to_json,
          {"Content-Type": "application/json"}
        )
    end

    private

    attr_reader :goal

    def user
      @user ||= goal.user
    end

    def organization
      @organization ||= goal.election.organization
    end

    def content
      "_#{user.name}_ just applied to Take Off Istanbul! Check out their profile and their application: https://beta.talentprotocol.com/u/#{user.username}"
    end
  end
end
