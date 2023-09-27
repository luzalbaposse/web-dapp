module ExperienceRewards
  class MediumTal < ExperienceReward
    def give_reward(user)
      return unless user.talent.verified?

      chain_id = (ENV["CONTRACTS_ENV"] == "production") ? 137 : 44787
      GiveTalAsRewardJob.perform_later(chain_id: chain_id, amount: 1000, to: user.wallet_id)

      true
    end
  end
end
