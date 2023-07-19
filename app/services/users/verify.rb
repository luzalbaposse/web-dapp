module Users
  class Verify
    attr_reader :user

    def initialize(user:)
      @user = user
    end

    def call
      user.talent.update!(verified: true)
      ActivityIngestJob.perform_now("verify", nil, user.id)
    end
  end
end
