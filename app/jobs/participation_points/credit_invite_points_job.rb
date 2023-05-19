class ParticipationPoints::CreditInvitePointsJob < ApplicationJob
  queue_as :default

  def perform(invite_id)
    invite = Invite.find(invite_id)

    ParticipationPoints::CreditInvitePoints.new(invite:).call
  end
end
