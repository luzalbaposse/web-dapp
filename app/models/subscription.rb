class Subscription < ApplicationRecord
  belongs_to :user
  belongs_to :subscriber, foreign_key: :subscriber_id, class_name: "User"

  enum subscribed_back_status: {
    no_request: "no_request",
    pending: "pending",
    accepted: "accepted"
  }

  def pending?
    accepted_at.blank?
  end
end
