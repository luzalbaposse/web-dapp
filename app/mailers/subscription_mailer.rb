class SubscriptionMailer < ApplicationMailer
  def subscription_request_email
    user = User.find(indifferent_access_params[:recipient_id])
    pending_subscribe_requests = user.pending_subscribers.count

    dynamic_template_data = {
      first_name: sendgrid_first_name_variable(user),
      pending_subscribe_requests:
    }

    template_id = "d-cce7c115f2dd4e9dbf2898403ea2b6fb"
    to = user.email

    send_sendgrid_email(dynamic_template_data:, template_id:, to:)
  end

  def subscription_accepted_email
    subscribed = User.find(indifferent_access_params[:source_id])
    user = indifferent_access_params[:recipient]

    dynamic_template_data = {
      first_name: sendgrid_first_name_variable(user),
      subscribed_profile: user_url(username: subscribed.username),
      subscribed_username: subscribed.username
    }

    template_id = "d-adfed86609d246679a69351e34e3fd9a"
    to = indifferent_access_params[:recipient].email

    send_sendgrid_email(dynamic_template_data:, template_id:, to:)
  end
end
