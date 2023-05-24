class ExperiencePoint < ApplicationRecord
  belongs_to :user
  belongs_to :source, polymorphic: true

  validates :amount, :credited_at, :description, presence: true

  LEADERBOARD_START_DATE = Date.new(2023, 6, 1)

  def self.leaderboard(start_date: LEADERBOARD_START_DATE, end_date: Time.current)
    start_date = start_date.beginning_of_day
    end_date = end_date.end_of_day

    join = <<~SQL
      LEFT JOIN (
        SELECT user_id, sum(amount) as score
        FROM experience_points
        WHERE credited_at BETWEEN '#{start_date}' AND '#{end_date}'
        GROUP BY user_id
      ) results on results.user_id = users.id
    SQL

    User.joins(join).where("results.user_id IS NOT NULL AND results.score > 0").order("results.score desc")
  end
end
