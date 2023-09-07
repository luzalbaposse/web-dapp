class ExperienceReward < ApplicationRecord
  TYPES = %w[
    ExperienceRewards::TinyTal
    ExperienceRewards::SmallTal
    ExperienceRewards::MediumTal
    ExperienceRewards::LargeTal
    ExperienceRewards::Cap
    ExperienceRewards::Tshirt
    ExperienceRewards::Sweater
  ].freeze

  include ::ImageUploader::Attachment(:image)

  has_many :experience_reward_claims, dependent: :destroy
  has_many :merch_codes, dependent: :destroy

  scope :active, -> { where(active: true) }

  validates :type, inclusion: {in: TYPES}

  def claimed?(user)
    experience_reward_claims.where(user: user).any?
  end

  def give_reward(_user)
    raise NotImplementedError
  end
end
