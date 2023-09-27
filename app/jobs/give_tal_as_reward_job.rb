class GiveTalAsRewardJob < ApplicationJob
  queue_as :default

  def perform(chain_id:, amount:, to:)
    service = Web3::MintVirtualTal.new(chain_id: chain_id)
    service.call(amount: amount, to: to, reason: "experience_rewards")
  end
end
