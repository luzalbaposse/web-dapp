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
        SELECT user_id, sum(amount) as score, row_number() OVER (order by sum(amount) desc) as position
        FROM experience_points
        JOIN users on users.id = experience_points.user_id
        WHERE credited_at BETWEEN '#{start_date}' AND '#{end_date}'
        AND users.role = 'basic'
        GROUP BY user_id
        HAVING sum(amount) > 0
      ) results on results.user_id = users.id
    SQL

    User.joins(join).where("results.user_id IS NOT NULL").order("results.position asc")
  end
end
