class MessageReceivedNotification < BaseNotification
  deliver_by :email,
    mailer: "UserMailer",
    method: :send_message_received_email,
    delay: 15.minutes,
    if: :should_deliver_immediate_email?

  def actions
    [
      {
        hierarchy: "primary",
        label: t(".button"),
        request_type: "GET",
        url:
      }
    ]
  end

  def source
    @source ||= User.find_by(id: params["sender_id"])
  end

  def url
    messages_url(user: source&.username)
  end
end
