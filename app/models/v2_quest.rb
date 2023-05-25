class V2Quest < ApplicationRecord
  VALID_QUEST_TYPES = %w[
    profile_picture
    three_journey_entries
    connect_wallet
    send_career_update
    three_talent_subscribe
    verify_identity
    five_subscribers
    complete_profile
    supporting_three
  ]

  validates :title, :quest_type, uniqueness: true
  validates :experience_points_amount, :title, :description, :quest_type, presence: true
  validates_inclusion_of :quest_type, in: VALID_QUEST_TYPES

  has_many :user_v2_quests
end
