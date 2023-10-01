module Quests
  class CalculateMonthlyUpdateStreakCount
    def initialize(user:)
      @user = user
    end

    def call
      return 0 unless user.career_updates.any?

      count = 0
      date = Date.today.beginning_of_month

      while career_update_created_within_month?(date)
        count += 1
        date -= 1.month
      end

      count
    end

    private

    attr_reader :user

    def career_updates
      @career_updates ||= user.career_updates.order(created_at: :desc)
    end

    def career_update_created_within_month?(date)
      user
        .career_updates
        .where("DATE(created_at) >= ? AND DATE(created_at) <= ?", date, date.end_of_month)
        .any?
    end
  end
end
