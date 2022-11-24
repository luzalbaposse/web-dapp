class CareerNeed < ApplicationRecord
  belongs_to :career_goal

  MENTORING_OTHERS = "Mentoring others".freeze
  LOOKING_MENTORSHIP = "Being matched with a mentor".freeze
end
