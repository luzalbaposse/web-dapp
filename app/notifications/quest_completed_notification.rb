class QuestCompletedNotification < BaseNotification
  include ActionView::Helpers::NumberHelper

  def body
    message = "You have been credited with #{number_with_delimiter(params["experience_points"])} XP"
    message << " and #{params["tal_reward"]} $TAL" if params["tal_reward"]&.positive?
    message << "."
  end

  def source
    @source ||= Quest.find_by(id: params["source_id"])
  end

  def url
    quests_url
  end
end
