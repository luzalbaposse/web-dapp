class TalentApplicationApprovedNotification < BaseNotification
  def url
    user_url(username: recipient.username, tab: "support")
  end
end
