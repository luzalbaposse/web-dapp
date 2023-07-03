class Quests::RefreshTalentMateQuestsJob < ApplicationJob
  queue_as :default

  def perform
    quest = Quest.find_by(quest_type: "create_talent_mate")
    user_ids = UserQuest.where(quest: quest).pluck(:user_id)

    User.joins(:talent).where.not(id: user_ids).where(talent: {verified: true}).find_each do |user|
      Quests::RefreshUserQuest.new(user: user, quest: quest).call
    end
  end
end
