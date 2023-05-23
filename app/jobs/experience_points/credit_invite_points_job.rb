class ExperiencePoints::CreditInvitePointsJob < ApplicationJob
  queue_as :default

  def perform(invite_id)
    invite = Invite.find(invite_id)

    ExperiencePoints::CreditInvitePoints.new(invite:).call
  end
end
