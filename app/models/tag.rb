class Tag < ApplicationRecord
  belongs_to :discovery_row, optional: true
  has_many :user_tags, dependent: :destroy

  validates :description, presence: true

  has_many :organization_tags
  has_many :organizations, through: :organization_tags

  scope :visible, -> { where(hidden: false) }

  def to_s
    description
  end
end
