namespace :races do
  task setup_first_race: :environment do
    # Reset all user races
    User.where.not(race_id: nil).update_all(race_id: nil)

    race = Race.new
    start_date = Date.new(2022, 8, 22).to_datetime
    race.started_at = start_date
    race.ends_at = start_date + 1.week - 1.second
    race.save!

    # Add race to all users that completed the beginner quest
    users = User.beginner_quest_completed
    users.update_all(race_id: race.id)

    next_race = Race.new
    next_start_date = (race.ends_at + 1.day).beginning_of_day
    next_race.started_at = next_start_date.beginning_of_day
    next_race.ends_at = next_start_date + 1.week - 1.second
    next_race.save!
  end
end
