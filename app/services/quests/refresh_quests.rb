# Refresh all quests
module Quests
  class RefreshQuests
    def call
      Quest.where(new: true).where("created_at < ?", 30.days.ago).find_each do |quest|
        quest.update!(new: false)
      end
    end
  end
end
