class QuestCompletedNotification < BaseNotification
  def url
    quest_url(params["type"]) if params["type"]
  end
end
