class Quests::RefreshUserQuestsJob < ApplicationJob
  queue_as :default

  def perform(user_id)
    user = User.find(user_id)

    Quests::RefreshUserQuests.new(user: user).call
  end
end
