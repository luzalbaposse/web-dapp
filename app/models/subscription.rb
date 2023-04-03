class Subscription < ApplicationRecord
  belongs_to :user
  belongs_to :subscriber, foreign_key: :subscriber_id, class_name: "User"

  def pending?
    accepted_at.blank?
  end
end
