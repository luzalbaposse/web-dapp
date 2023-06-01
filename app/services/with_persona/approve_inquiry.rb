require "with_persona/client"

module WithPersona
  class ApproveInquiry
    def initialize(talent:, inquiry_first_name:, inquiry_last_name:)
      @talent = talent
      @inquiry_first_name = inquiry_first_name&.downcase
      @inquiry_last_name = inquiry_last_name&.downcase
    end

    def call
      if names_match?
        talent.update(verified: true)
        refresh_user_quests
      else
        with_persona_id = talent.with_persona_id
        talent.update(with_persona_id: nil)

        Rollbar.warning(
          "Persona names mismatch",
          legal_first_name: user.legal_first_name,
          legal_last_name: user.legal_last_name,
          inquiry_first_name: inquiry_first_name,
          inquiry_last_name: inquiry_last_name,
          user_id: user.id,
          with_persona_id: with_persona_id
        )

        CreateNotification.new.call(
          recipient: user,
          source_id: user.id,
          type: UserNamesVerificationFailedNotification,
          extra_params: {reason: "name", with_persona_id: with_persona_id}
        )
      end
    end

    private

    attr_reader :talent, :inquiry_first_name, :inquiry_last_name

    def user
      @user ||= talent.user
    end

    def names_match?
      names_exists? && first_name_match? && last_name_match?
    end

    def names_exists?
      user.legal_first_name && user.legal_last_name
    end

    def first_name_match?
      inquiry_first_name.include?(user.legal_first_name&.downcase) || inquiry_first_name.include?(user.legal_last_name&.downcase)
    end

    def last_name_match?
      inquiry_last_name.include?(user.legal_last_name&.downcase) || inquiry_last_name.include?(user.legal_first_name&.downcase)
    end

    def refresh_user_quests
      Quests::RefreshUserQuests.new(user: user).call
    end
  end
end
