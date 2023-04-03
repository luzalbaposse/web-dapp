class PendingSubscription < Subscription
  default_scope { where(accepted_at: nil) }

  def pending?
    true
  end
end
