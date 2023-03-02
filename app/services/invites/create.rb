module Invites
  class Create
    MAX_RETRIES = 5

    def initialize(params)
      @max_uses = params.fetch(:max_uses, nil)
      @partnership = params.fetch(:partnership, nil)
      @user = params.fetch(:user, nil)
    end

    def call
      invite = existing_invite
      return invite if invite

      invite = Invite.new
      invite.partnership = partnership
      invite.max_uses = max_uses
      invite.user = user

      count = 0

      begin
        invite.code = code(invite)
        invite.save!
      rescue ActiveRecord::RecordNotUnique
        count += 1
        retry if count <= MAX_RETRIES
      end

      invite
    end

    private

    attr_reader :max_uses, :partnership, :user

    def existing_invite
      record = partnership || user
      return unless record

      record.invites.first
    end

    def code(invite)
      return user_code if user
      return partnership_code if partnership

      "invite-#{Invite.generate_code}"
    end

    def partnership_code
      code = partnership.name.parameterize

      if Invite.where(code: code).any?
        return "#{code}-#{Invite.generate_code}"
      end

      code
    end

    def user_code
      if Invite.where(code: user.username).any?
        return "#{user.username}-#{Invite.generate_code}"
      end

      user.username
    end
  end
end
