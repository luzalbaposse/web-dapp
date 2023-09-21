module ExperienceRewards
  class LargeTal < ExperienceReward
    def give_reward(user)
      return unless user.talent.verified?

      chain_id = (ENV["CONTRACTS_ENV"] == "production") ? 137 : 44787
      service = Web3::MintVirtualTal.new(chain_id: chain_id)

      service.call(amount: 2000, to: user.wallet_id, reason: "experience_rewards")
    end
  end
end
