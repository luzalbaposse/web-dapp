class TokenAcquiredNotification < BaseNotification
  param "source_id"

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

  def body
    t(".body", amount: params["amount"])
  end

  def url
    user_url(recipient.username, tab: "support")
  end
end
