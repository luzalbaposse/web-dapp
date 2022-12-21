class WithPersonaRequest < ApplicationRecord
  # Month is an integer 1 through 12
  # Year is an integer

  validates :month, presence: true
  validates :year, presence: true
end
