class ExperiencePoint < ApplicationRecord
  belongs_to :user
  belongs_to :source, polymorphic: true

  validates :amount, :credited_at, :description, presence: true
end
