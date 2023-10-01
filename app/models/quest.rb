class Quest < ApplicationRecord
  VALID_QUEST_TYPES = %w[
    active_goal
    complete_profile
    connect_wallet
    create_talent_mate
    five_subscribers
    galxe_verification
    invite_three
    monthly_update
    profile_picture
    send_career_update
    sponsor_talent
    supporting_three
    takeoff_vote
    three_journey_entries
    three_talent_subscribe
    three_token_holders
    verify_humanity
    verify_identity
  ]

  validates :title, :quest_type, uniqueness: true
  validates :title, :description, :quest_type, presence: true
  validates_inclusion_of :quest_type, in: VALID_QUEST_TYPES

  has_many :quest_experience_points
  has_many :user_quests

  def experience_points_amount
    quest_experience_points.first&.amount || read_attribute(:experience_points_amount)
  end

  def name
    "Quest: #{title}"
  end
end
