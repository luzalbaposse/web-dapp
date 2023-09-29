module ExperienceRewards
  class LargeTal < ExperienceReward
    def give_reward(user)
      chain_id = (ENV["CONTRACTS_ENV"] == "production") ? 137 : 44787
      GiveTalAsRewardJob.perform_later(chain_id: chain_id, amount: 2000, to: user.wallet_id)

      true
    end
  end
end
