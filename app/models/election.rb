class Election < ApplicationRecord
  belongs_to :organization, class_name: "Organizations::Election"
  has_many :votes, dependent: :destroy
  has_many :voters, through: :votes, source: :user
  has_many :candidates_with_votes, through: :votes, source: :candidate
  has_many :candidates, through: :organization, source: :users

  scope :active, -> { where("start_date <= ? AND voting_end_date >= ?", Date.today, Date.today) }

  def active?
    start_date <= Date.today && voting_end_date >= Date.today
  end

  def voting_active?
    voting_start_date <= Date.today && voting_end_date >= Date.today
  end

  def applications_only?
    start_date <= Date.today && voting_start_date >= Date.today
  end

  def winners_confirmation_period?
    voting_end_date <= Date.today && rewards_distributed == false
  end

  def election_over?
    voting_end_ate <= Date.today && rewards_distributed == true
  end
end
