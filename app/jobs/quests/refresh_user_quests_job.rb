class Quests::RefreshUserQuestsJob < ApplicationJob
  queue_as :default

  def perform(user_id, notify = true)
    user = User.find(user_id)

    Quests::RefreshUserQuests.new(user: user, notify: notify).call
  end
end
