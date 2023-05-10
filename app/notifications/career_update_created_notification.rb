class CareerUpdateCreatedNotification < BaseNotification
  def url
    messages_url(user: source.id)
  end
end
