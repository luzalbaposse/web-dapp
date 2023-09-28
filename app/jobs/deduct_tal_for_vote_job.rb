class DeductTalForVoteJob < ApplicationJob
  queue_as :default

  def perform(vote_id:, chain_id:)
    vote = Vote.find_by(id: vote_id)

    service = Web3::BurnVirtualTal.new(chain_id: chain_id)
    tx = service.call(amount: vote.cost, from: vote.voter.wallet_id)

    if tx
      vote.update!(tx_hash: tx, chain_id: chain_id)
    else
      vote.destroy
    end
  end
end
