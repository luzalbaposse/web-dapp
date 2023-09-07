module ExperienceRewards
  class SmallTal < ExperienceReward
    def give_reward(user)
      return unless user.talent.verified?

      chain_id = (ENV["CONTRACTS_ENV"] == "production") ? 137 : 44787
      service = Web3::MintVirtualTal.new(chain_id: chain_id)
      tx = nil

      service.call(amount: 500, to: user.wallet_id, reason: "experience_rewards") do |tx_hash|
        tx = tx_hash
      end

      tx
    end
  end
end
