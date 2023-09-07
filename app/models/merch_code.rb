class MerchCode < ApplicationRecord
  belongs_to :experience_reward
  belongs_to :user, optional: true

  scope :used, -> { where(assigned: true) }
  scope :assignable, -> { where(assigned: false) }
end
