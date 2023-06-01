# Keeping this only for old leaderboards
# It might be useful to review who won each past race
class Race < ApplicationRecord
  has_many :users
  has_many :leaderboards
end
