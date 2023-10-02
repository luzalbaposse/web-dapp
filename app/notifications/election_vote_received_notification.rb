class ElectionVoteReceivedNotification < BaseNotification
  deliver_by :email,
    mailer: "UserMailer",
    method: :send_election_vote_received_email,
    delay: 15.minutes,
    if: :should_deliver_immediate_email?

  def body
    "You have received #{source.amount} votes from #{source.voter.name}. Total votes received: #{total_votes_received}. Your position is: #{candidate_position}°"
  end
  
  def total_votes_received
    Vote.where(election_id: params["election_id"]).sum(:amount)
  end
  
  def calculate_candidate_position(candidate_id, election_id)
    votes_received = Vote.where(election_id: election_id).order(amount: :desc).pluck(:candidate_id)
    candidate_position = votes_received.index(candidate_id) + 1
    candidate_position
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
