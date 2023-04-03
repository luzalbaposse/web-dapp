class SyncSponsorshipJob < ApplicationJob
  queue_as :default

  def perform(tx_hash)
    service = Web3::SponsorshipSync.new
    service.call(tx_hash)
  end
end
