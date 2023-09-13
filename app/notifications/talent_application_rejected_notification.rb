class TalentApplicationRejectedNotification < BaseNotification
  def url
    user_url(username: recipient.username)
  end
end
