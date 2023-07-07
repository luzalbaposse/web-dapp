module Invites
  class Create
    MAX_RETRIES = 5

    def initialize(params)
      @max_uses = params.fetch(:max_uses, nil)
      @organization = params.fetch(:organization, nil)
      @partnership = params.fetch(:partnership, nil)
      @user = params.fetch(:user, nil)
    end

    def call
      invite = existing_invite
      return invite if invite

      invite = Invite.new
      invite.max_uses = max_uses
      invite.organization = organization
      invite.partnership = partnership
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

    attr_reader :max_uses, :organization, :partnership, :user

    def existing_invite
      record = organization || partnership || user
      return unless record

      record.invites.first
    end

    def code(invite)
      return record_code(organization) if organization
      return record_code(partnership) if partnership
      return user_code if user

      "invite-#{Invite.generate_code}"
    end

    def record_code(record)
      code = record.name.parameterize
      return "#{code}-#{Invite.generate_code}" if Invite.where(code:).any?

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
