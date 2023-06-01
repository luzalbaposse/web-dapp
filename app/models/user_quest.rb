class UserQuest < ApplicationRecord
  belongs_to :user
  belongs_to :quest

  validates :completed_at, :credited_experience_points_amount, presence: true
  validates :user_id, uniqueness: {scope: :quest_id}
end
