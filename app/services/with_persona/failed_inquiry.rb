require "with_persona/client"

module WithPersona
  class FailedInquiry
    def initialize(talent:)
      @talent = talent
    end

    def call
      talent.update(with_persona_id: nil)
      CreateNotification.new.call(
        recipient: user,
        source_id: user.id,
        type: UserPersonaVerificationFailedNotification,
        extra_params: {reason: "with_persona"}
      )
    end

    private

    attr_reader :talent

    def user
      @user ||= talent.user
    end
  end
end
