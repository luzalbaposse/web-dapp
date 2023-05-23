# Credited points for a specific invite
module ParticipationPoints
  class CreditInvitePoints
    START_DATE = Date.new(2023, 6, 1)
    AMOUNT = 100

    def initialize(invite:)
      raise ArgumentError, "Invite is required" unless invite
      @invite = invite
    end

    def call
      credited_at = Time.current
      description = "Invite #{invite.code} used."

      (verified_users_count - invite_current_participation_points_count).times do
        ParticipationPoint.create!(
          user: inviter,
          source: invite,
          amount: AMOUNT,
          credited_at: credited_at,
          description: description
        )
      end
    end

    private

    attr_reader :invite

    def inviter
      @inviter ||= invite.user
    end

    def verified_users_count
      User.joins(:talent)
        .where(invite_id: invite.id)
        .where("users.created_at >= ?", START_DATE)
        .where(talent: {verified: true})
        .count
    end

    def invite_current_participation_points_count
      ParticipationPoint.where(
        user: inviter,
        source: invite
      ).count
    end
  end
end
