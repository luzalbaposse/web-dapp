module Users
  class Verify
    attr_reader :user

    def initialize(user:)
      @user = user
    end

    def call
      user.talent.update!(verified: true)
      WhitelistUserJob.perform_later(user_id: user.id, level: "verified")
      ActivityIngestJob.perform_later("verify", nil, user.id)
    end
  end
end
