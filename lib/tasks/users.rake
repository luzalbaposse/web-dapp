namespace :users do
  desc "Associate goals with users"
  task associate_goals: :environment do
    Goal.includes(career_goal: [talent: :user]).find_each do |goal|
      goal.update_column(:user_id, goal.career_goal.talent.user_id)
    end
  end

  desc "Migrate pitch from career goal to profile on talent"
  task migrate_pitch_to_profile: :environment do
    Talent.joins(:career_goal).where.not(career_goal: {pitch: nil}).find_each do |talent|
      talent.about = talent.career_goal.pitch
      talent.save(touch: false)
    end
  end

  desc "Send reactivation email to legacy accounts"
  task send_reactivation_email_to_legacy_accounts: :environment do
    User
      .where("DATE(last_access_at) != DATE(created_at)")
      .where("last_access_at < ?", 365.days.ago)
      .find_each do |user|
        UserMailer.with(user:).send_legacy_account_reactivation_email.deliver_later
      end
  end
end
