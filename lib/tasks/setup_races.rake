namespace :races do
  task create_past_leaderboards: :environment do
    active_race = Race.active_race

    past_races = Race.where("started_at >= ?", Date.new(2022, 8, 15)).where.not(id: active_race.id)

    past_races.find_each do |race|
      race.results.to_a.each do |result|
        Leaderboard.create!(
          race: race,
          score: result["overall_result"],
          user_id: result["id"]
        )
      end
    end
    # Refresh the current race
    Leaderboards::RefreshRaceScores.new(race: active_race).call
  end
end
