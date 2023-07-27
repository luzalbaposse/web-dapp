class SubscriptionAcceptedNotification < BaseNotification
  deliver_by :email,
    mailer: "SubscriptionMailer",
    method: :subscription_accepted_email,
    delay: 15.minutes,
    if: :should_deliver_immediate_email?

  def url
    user_url(username: source.username)
  end
end
