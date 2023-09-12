namespace :users do
  desc "Associate goals with users"
  task associate_goals: :environment do
    Goal.includes(career_goal: [talent: :user]).find_each do |goal|
      goal.update_column(:user_id, goal.career_goal.talent.user_id)
    end
  end

  task migrate_pitch_to_profile: :environment do
    desc "Migrate pitch from career goal to profile on talent"

    Talent.joins(:career_goal).where.not(career_goal: {pitch: nil}).find_each do |talent|
      talent.about = talent.career_goal.pitch
      talent.save(touch: false)
    end
  end
end
