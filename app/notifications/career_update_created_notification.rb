class CareerUpdateCreatedNotification < BaseNotification
  deliver_by :email,
    mailer: "UserMailer",
    method: :send_career_update_created_email,
    delay: 15.minutes,
    if: :should_deliver_immediate_email?

  def actions
    [
      {
        hierarchy: "primary",
        label: t(".button"),
        request_type: "GET",
        url: messages_url(user: source&.username)
      }
    ]
  end

  def url
    messages_url(user: source&.username)
  end
end
