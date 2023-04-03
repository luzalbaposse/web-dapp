# Preview all emails at http://localhost:3000/rails/mailers/subscription_mailer
class SubscriptionMailerPreview < ActionMailer::Preview
  def subscription_request_email
    user = User.joins(:pending_subscriptions).first
    SubscriptionMailer.with(user_id: user.id).subscription_request_email
  end

  def subscription_accepted_email
    SubscriptionMailer.with(user_id: User.first.id, source_id: User.second.id).subscription_accepted_email
  end
end
