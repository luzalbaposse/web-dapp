class ElectionVoteReceivedNotification < BaseNotification
  deliver_by :email,
    mailer: "UserMailer",
    method: :send_election_vote_received_email,
    delay: 15.minutes,
    if: :should_deliver_immediate_email?

  def body
    "You have received #{source.amount} votes from #{source.voter.name}"
  end

  def election
    Election.find_by(id: params["election_id"])
  end

  def source
    @source ||= Vote.find_by(id: params["vote_id"])
  end

  def url
    collective_url(id: election.organization.slug)
  end
end
