class Election < ApplicationRecord
  belongs_to :organization, class_name: "Organizations::Election"
  has_many :votes, dependent: :destroy
  has_many :voters, through: :votes, source: :user
  has_many :candidates_with_votes, through: :votes, source: :candidate
  has_many :candidates, through: :organization, source: :users

  scope :active, -> { where("start_date <= ? AND voting_end_date >= ?", Date.today, Date.today) }

  validate :only_one_active_for_organization

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

  private

  def only_one_active_for_organization
    return unless organization.elections.active.exists?

    errors.add(:base, "There can only be one active election per organization")
  end
end
