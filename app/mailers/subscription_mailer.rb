class SubscriptionMailer < ApplicationMailer
  def subscription_request_email
    @recipient = User.find(indifferent_access_params[:user_id])
    pending_subscribers = User.where(id: @recipient.pending_subscriptions.pluck(:subscriber_id))
    @pending_subscribers_total_count = pending_subscribers.count
    @pending_subscribers = pending_subscribers.limit(5)
    set_profile_pictures_attachments(@pending_subscribers)

    bootstrap_mail(to: @recipient.email, subject: "You have subscription requests!")
  end

  def subscription_accepted_email
    @recipient = User.find(indifferent_access_params[:user_id])
    @sender = User.find(indifferent_access_params[:source_id])

    set_profile_picture_attachment(@sender)

    bootstrap_mail(to: @recipient.email, subject: "Your subscription request was accepted!")
  end
end
