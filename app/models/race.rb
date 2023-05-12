class Race < ApplicationRecord
  has_many :users
  has_many :leaderboards

  def self.active_race
    current_time = Time.current
    find_by("started_at <= ? AND ? < ends_at", current_time, current_time)
  end

  # TODO: Kill this once the invites page is using leaderboards
  def results
    # First four races had different ways of calculating results
    # We now only want to include users that have purchased tokens
    query = if id <= 4
      Races::ResultsWithWalletConnected.new.call(race: self)
    elsif started_at < Date.new(2022, 8, 15)
      Races::ResultsWithWalletConnectedAndTokensBought.new.call(race: self)
    elsif ends_at < Date.new(2023, 5, 1) && started_at > Date.new(2022, 8, 15)
      Races::ResultsWithBeginnerQuestCompleted.new.call(race: self)
    else
      Races::ResultsWithOnboardingCompleted.new.call(race: self)
    end

    ActiveRecord::Base.connection.execute(query)
  end
end
