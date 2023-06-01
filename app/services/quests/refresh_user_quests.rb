# Refresh all quests for a specific user
module Quests
  class RefreshUserQuests
    def initialize(user:, notify: true)
      @user = user
      @notify = notify
    end

    def call
      Quest.find_each do |quest|
        RefreshUserQuest.new(user: user, quest: quest, notify: notify).call
      end
    end

    private

    attr_reader :user, :notify
  end
end
