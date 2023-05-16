class CareerUpdateCreatedNotification < BaseNotification
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
