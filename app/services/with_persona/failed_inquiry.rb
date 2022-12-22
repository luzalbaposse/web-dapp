require "with_persona/client"

module WithPersona
  class FailedInquiry
    def initialize(talent:)
      @talent = talent
    end

    def call
      talent.update(with_persona_id: nil)
      # failed notification
    end

    private

    attr_reader :talent

    def user
      @user ||= talent.user
    end
  end
end
