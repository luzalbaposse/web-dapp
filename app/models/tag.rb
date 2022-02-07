class Tag < ApplicationRecord
  has_many :talent_tags
  has_many :talents, through: :talent_tags

  def to_s
    description
  end
end
