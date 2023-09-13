class Election < ApplicationRecord
  belongs_to :organization, class_name: "Organizations::Election"
  has_many :votes, dependent: :destroy
  has_many :voters, through: :votes, source: :user
  has_many :candidates_with_votes, through: :votes, source: :candidate
  has_many :candidates, through: :organization, source: :users
end
