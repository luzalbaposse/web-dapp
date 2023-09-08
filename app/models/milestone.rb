class Milestone < ApplicationRecord
  has_paper_trail

  belongs_to :talent

  has_many :career_update_associations, as: :associable_entity
  has_many :career_updates, through: :career_update_associations

  has_many :milestone_images, dependent: :destroy
  accepts_nested_attributes_for :milestone_images, allow_destroy: true
  validates_associated :milestone_images

  validate :end_date_after_start_date, if: -> { end_date.present? }

  enum category: {Position: "Position", Education: "Education", Other: "Other"}

  private

  def end_date_after_start_date
    errors.add(:base, "Start date needs to be before the end date") if start_date > end_date
  end
end
