# Refresh all quests for a specific user
module Quests
  class RefreshUserQuests
    def initialize(user:)
      @user = user
    end

    def call
      V2Quest.find_each do |quest|
        RefreshUserQuest.new(user: user, quest: quest).call
      end
    end

    private

    attr_reader :user
  end
end
