class SyncSponsorshipJob < ApplicationJob
  queue_as :default

  def perform(tx_hash, chain_id)
    service = Web3::SponsorshipSync.new(tx_hash, chain_id)
    service.call
  end
end
