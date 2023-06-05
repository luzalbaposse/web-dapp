# Credited points for a specific invite
module ExperiencePoints
  class CreditInvitePoints
    START_DATE = Date.new(2023, 6, 1)
    AMOUNT = 500

    def initialize(invite:)
      raise ArgumentError, "Invite is required" unless invite
      @invite = invite
    end

    def call
      credited_at = Time.current
      description = "Invite #{invite.code} used."

      (verified_users_count - invite_current_experience_points_count).times do
        ActiveRecord::Base.transaction do
          ExperiencePoints::Create.new(
            user: inviter,
            source: invite,
            amount: AMOUNT,
            credited_at: credited_at,
            description: description
          ).call
        end
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

    def invite_current_experience_points_count
      ExperiencePoint.where(
        user: inviter,
        source: invite
      ).count
    end
  end
end
