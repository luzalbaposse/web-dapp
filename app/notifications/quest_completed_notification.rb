class QuestCompletedNotification < BaseNotification
  def body
    "You have been credited with #{params["experience_points"]} XP."
  end

  def source
    @source ||= V2Quest.find_by(id: params["source_id"])
  end

  def url
    earn_url
  end
end
