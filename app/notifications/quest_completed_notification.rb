class QuestCompletedNotification < BaseNotification
  include ActionView::Helpers::NumberHelper

  def body
    "You have been credited with #{number_with_delimiter(params["experience_points"])} XP."
  end

  def source
    @source ||= V2Quest.find_by(id: params["source_id"])
  end

  def url
    earn_url
  end
end
