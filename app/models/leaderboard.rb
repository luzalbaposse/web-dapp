class Leaderboard < ApplicationRecord
  belongs_to :race
  belongs_to :user

  validates :score, presence: true
end
