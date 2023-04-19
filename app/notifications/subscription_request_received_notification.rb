class SubscriptionRequestReceivedNotification < BaseNotification
  deliver_by :email, mailer: "SubscriptionMailer", method: :subscription_request_email, delay: 3.hours, if: :send_email?

  def send_email?
    unread? && !emailed? && recipient.pending_subscribers.any?
  end

  def url
    network_url
  end
end
