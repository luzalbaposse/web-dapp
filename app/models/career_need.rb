class CareerNeed < ApplicationRecord
  belongs_to :career_goal

  HIRING_NEEDS = ["Finding and hiring talent"].freeze
  ROLE_NEEDS = [
    "Freelancing or contract roles",
    "Full-time roles",
    "Part-time roles"
  ].freeze
  MENTORING_OTHERS = "Mentoring others".freeze
  LOOKING_MENTORSHIP = "Being matched with a mentor".freeze

  update_index("talents") { career_goal.talent }

  after_save :touch_talent

  private

  def touch_talent
    career_goal.talent.touch
  end
end
