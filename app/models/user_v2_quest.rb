class UserV2Quest < ApplicationRecord
  belongs_to :user
  belongs_to :v2_quest

  validates :completed_at, :credited_amount, presence: true
  validates :user_id, uniqueness: {scope: :v2_quest_id}
end
