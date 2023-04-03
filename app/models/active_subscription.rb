class ActiveSubscription < Subscription
  default_scope { where.not(accepted_at: nil) }

  def pending?
    false
  end
end
