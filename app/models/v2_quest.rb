class V2Quest < ApplicationRecord
  validates :title, uniqueness: true
  validates :participation_points_amount, :title, :description, presence: true
end
