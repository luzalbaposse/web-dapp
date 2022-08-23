class Race < ApplicationRecord
  has_many :users

  def self.active_race
    current_time = Time.current
    find_by("started_at <= ? AND ? < ends_at", current_time, current_time)
  end

  def results
    # First four races had different ways of calculating results
    # We now only want to include users that have purchased tokens
    query = if id <= 4
      Races::ResultsWithWalletConnected.new.call(race: self)
    elsif started_at < Date.new(2022, 8, 15)
      Races::ResultsWithWalletConnectedAndTokensBought.new.call(race: self)
    else
      Races::ResultsWithBeginnerQuestCompleted.new.call(race: self)
    end

    ActiveRecord::Base.connection.execute(query)
  end
end
