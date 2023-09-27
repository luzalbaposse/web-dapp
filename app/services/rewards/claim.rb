# Refresh all quests
module Rewards
  class Claim
    def initialize(user:, reward:)
      @user = user
      # ensure we are using the subclass
      @reward = reward
    end

    def call
      ActiveRecord::Base.transaction do
        # reward out of stock
        return if reward.stock <= 0 || reward.claimed?(user)
        # user does not have enough experience points
        return if user.experience_points.sum(:amount) < reward.cost

        reward.update!(stock: reward.stock - 1)

        reward.experience_reward_claims.create!(user: user)

        reward_detail = reward.give_reward(user)
        raise ActiveRecord::Rollback unless reward_detail

        reward_detail
      end
    end

    private

    attr_reader :user, :reward
  end
end
