module ExperienceRewards
  class TinyTal < ExperienceReward
    def give_reward(user)
      return unless user.talent.verified?

      chain_id = (ENV["CONTRACTS_ENV"] == "production") ? 137 : 44787
      service = Web3::MintVirtualTal.new(chain_id: chain_id)

      service.call(amount: 10, to: user.wallet_id, reason: "experience_rewards")
    end
  end
end
