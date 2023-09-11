class CareerNeed < ApplicationRecord
  belongs_to :career_goal, optional: true

  HIRING_NEEDS = ["Finding and hiring talent"].freeze
  ROLE_NEEDS = [
    "Freelancing or contract roles",
    "Full-time roles",
    "Part-time roles"
  ].freeze
  MENTORING_OTHERS = "Mentoring others".freeze
  LOOKING_MENTORSHIP = "Being matched with a mentor".freeze
end
