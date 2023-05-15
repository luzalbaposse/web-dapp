class ParticipationPoint < ApplicationRecord
  belongs_to :user

  validates :amount, :credited_at, :description, presence: true
end
