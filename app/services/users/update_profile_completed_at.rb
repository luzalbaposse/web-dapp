module Users
  class UpdateProfileCompletedAt
    def initialize(user:)
      @user = user
    end

    def call
      profile_completed = user.profile_completed?

      if profile_completed && !user.profile_completed_at
        user.update!(profile_completed_at: Time.current)
      elsif !profile_completed
        user.update!(profile_completed_at: nil)
      end
    end

    private

    attr_reader :user
  end
end
