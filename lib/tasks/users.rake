namespace :users do
  task update_profile_completeness: :environment do
    desc "Update profile completeness % for all users"

    User.find_each do |user|
      Users::UpdateProfileCompleteness.new(user: user).call
    end

    TalentsIndex.import!
  end

  task migrate_pitch_to_profile: :environment do
    desc "Migrate pitch from career goal to profile on talent"

    Talent.joins(:career_goal).where.not(career_goal: {pitch: nil}).find_each do |talent|
      talent.about = talent.career_goal.pitch
      talent.save(touch: false)
    end
  end
end
