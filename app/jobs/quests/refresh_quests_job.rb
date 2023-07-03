class Quests::RefreshQuestsJob < ApplicationJob
  queue_as :default

  def perform
    Quests::RefreshQuests.new.call
  end
end
