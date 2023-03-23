class Subscription < ApplicationRecord
  default_scope { where.not(accepted_at: nil) }

  belongs_to :user
  belongs_to :subscriber, foreign_key: :subscriber_id, class_name: "User"

  scope :pending, -> { unscoped.where(accepted_at: nil) }

  def pending?
    accepted_at.blank?
  end
end
