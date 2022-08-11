namespace :quests do
  task populate_new: :environment do
    puts "starting rake task to populate talent profile, talent token & ambassador quests"

    service = Tasks::Update.new

    User.all.order(:id).find_in_batches(start: ENV["START"]) do |batch|
      batch.each do |user|
        talent = user.try(:talent)

        # ---------------------------------------------------

        talent_profile_quest = Quests::TalentProfile.find_or_create_by!(user: user)

        Tasks::Highlights.find_or_create_by!(quest: talent_profile_quest)
        service.call(type: "Tasks::Highlights", user: user, normal_update: false) if (talent.try(:milestones).try(:length) || 0) > 0

        Tasks::Goals.find_or_create_by!(quest: talent_profile_quest)
        service.call(type: "Tasks::Goals", user: user, normal_update: false) if (talent.try(:career_goal).try(:goals).try(:length) || 0) > 0

        # ---------------------------------------------------

        talent_token_quest = Quests::TalentToken.find_or_create_by!(user: user)

        Tasks::ApplyTokenLaunch.find_or_create_by!(quest: talent_token_quest)
        service.call(type: "Tasks::ApplyTokenLaunch", user: user, normal_update: false) unless user.profile_type == "supporter"

        talent_quest = Quests::Talent.find_by(user: user)
        if talent_quest.present?
          talent_task = Tasks::LaunchToken.find_by(quest: talent_quest)
          talent_task.update!(quest: talent_token_quest) if talent_task.present?
          talent_quest.destroy
        else
          Tasks::LaunchToken.find_or_create_by!(quest: talent_token_quest)
        end
        service.call(type: "Tasks::LaunchToken", user: user, normal_update: false) if talent.try(:token).try(:deployed_at)

        Tasks::Perks.find_or_create_by!(quest: talent_token_quest)
        service.call(type: "Tasks::Perks", user: user, normal_update: false) if (talent.try(:perks).try(:length) || 0) > 0

      rescue
        puts "error populating quests for user #{user.username} - #{user.id}"
      end
    end
    puts "done!"
  end
end
