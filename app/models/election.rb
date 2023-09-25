class Election < ApplicationRecord
  belongs_to :organization, class_name: "Organizations::Election"
  has_many :votes, dependent: :destroy
  has_many :voters, through: :votes, source: :user
  has_many :candidates_with_votes, through: :votes, source: :candidate
  has_many :candidates, through: :organization, source: :users
  has_many :goals

  scope :active, -> { where("start_date <= ? AND voting_end_date >= ?", Date.today, Date.today) }

  validate :only_one_active_for_organization, on: :create

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
    voting_end_date <= Date.today && rewards_distributed == true
  end

  def status
    if election_over?
      "election_over"
    elsif applications_only?
      "applications_only"
    elsif voting_active?
      "voting_active"
    elsif winners_confirmation_period?
      "winners_confirmation_period"
    elsif active?
      "active"
    end
  end

  private

  def only_one_active_for_organization
    return unless organization.elections.active.exists?

    errors.add(:base, "There can only be one active election per organization")
  end
end
