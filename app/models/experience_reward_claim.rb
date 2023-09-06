class ExperienceRewardClaim < ApplicationRecord
  belongs_to :user
  belongs_to :experience_reward
end
