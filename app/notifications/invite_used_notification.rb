class InviteUsedNotification < BaseNotification
  def url
    quests_url(tab: "invites")
  end
end
