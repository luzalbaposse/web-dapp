# Refresh all quests
module Rewards
  class Claim
    class Error < StandardError; end

    class NotVerified < Error; end

    class OutOfStockReward < Error; end

    class NotEnoughExperiencePoints < Error; end

    class ErrorWhileGivingReward < Error; end

    def initialize(user:, reward:)
      @user = user
      # ensure we are using the subclass
      @reward = reward
    end

    def call
      ActiveRecord::Base.transaction do
        # user is not verified
        if !user.talent.verified?
          raise NotVerified, "You need to be verified to claim rewards."
        end
        # reward out of stock
        if reward.stock <= 0 || reward.claimed?(user)
          raise OutOfStockReward, "Reward is currently out of stock."
        end
        # user does not have enough experience points
        if user.experience_points.sum(:amount) < reward.cost
          raise NotEnoughExperiencePoints, "You don't have enough experience points."
        end

        reward.update!(stock: reward.stock - 1)

        reward.experience_reward_claims.create!(user: user)

        reward_detail = reward.give_reward(user)
        raise ErrorWhileGivingReward, "Error while giving reward." unless reward_detail

        reward_detail
      end
    end

    private

    attr_reader :user, :reward
  end
end
