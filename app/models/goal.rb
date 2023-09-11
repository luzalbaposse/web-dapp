class Goal < ApplicationRecord
  has_paper_trail

  belongs_to :career_goal, optional: true
  # TODO: Make it mandatory
  belongs_to :user, optional: true

  has_many :career_update_associations, as: :associable_entity
  has_many :career_updates, through: :career_update_associations

  has_many :goal_images, dependent: :destroy
  accepts_nested_attributes_for :goal_images, allow_destroy: true
  validates_associated :goal_images

  scope :due_today, -> { where(due_date: Date.current) }
  scope :due_in_one_month, -> { where(due_date: 30.days.after) }
  scope :due_date_passed_15_days_ago, -> { where(progress: [PLANNED, DOING], due_date: 15.days.ago) }
  scope :due_date_passed_30_days_ago, -> { where(progress: [PLANNED, DOING], due_date: 30.days.ago) }

  PLANNED = "planned".freeze
  DOING = "doing".freeze
  ACCOMPLISHED = "accomplished".freeze
  ABANDONED = "abandoned".freeze
  PAUSED = "paused".freeze

  enum progress: {
    planned: PLANNED,
    doing: DOING,
    accomplished: ACCOMPLISHED,
    abandoned: ABANDONED,
    paused: PAUSED
  }

  def to_s
    "#{due_date}: #{description}"
  end
end
