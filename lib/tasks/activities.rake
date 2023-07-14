namespace :activities do
  task migrate_default_messages: :environment do
    desc "Migrate all activity messages to new default format"

    activities = Activity
      .where.not(type: [
        "Activities::CareerUpdate",
        "Activities::GoalCreate",
        "Activities::GoalUpdate"
      ])
    count = activities.count

    activities.find_each.with_index do |activity, index|
      activity.message = activity.type.constantize.generate_content(activity.origin_user_id, activity.target_user_id)
      raise "Error while update activity #{activity.id}" unless activity.save!

      if index % 100 == 0 # Adjust this number depending on the size of your user base for more or less frequent logging.
        puts "Processed #{index} out of #{count} activities."
      end
    end
    puts "Done. Processed a total of #{count} activities."
  end

  task migrate_non_default_messages: :environment do
    desc "Migrate all activity messages to new default format"

    activities = Activity
      .where(type: [
        "Activities::GoalCreate",
        "Activities::GoalUpdate"
      ])
    count = activities.count

    activities.find_each.with_index do |activity, index|
      if activity.type == "Activities::GoalCreate"
        if activity.message.include? "just added"
          pattern = /just added/
          replacement = "added"
        elsif activity.message.include? "has just made progress on their journey by adding"
          pattern = /has just made progress on their journey by adding/
          replacement = "added"
        end
      elsif activity.type == "Activities::GoalUpdate"
        if activity.message.include? "just updated"
          pattern = /just updated/
          replacement = "updated"
        elsif activity.message.include? "has just made progress on their journey by updating"
          pattern = /has just made progress on their journey by updating/
          replacement = "updated"
        end
      end

      activity.message = activity.message.gsub(pattern, replacement)
      raise "Error while update activity #{activity.id}" unless activity.save!

      if index % 100 == 0 # Adjust this number depending on the size of your user base for more or less frequent logging.
        puts "Processed #{index} out of #{count} activities."
      end
    end
    puts "Done. Processed a total of #{count} activities."
  end

  task delete_all_milestones_activities: :environment do
    desc "Delete all milestones activities"

    activities = Activity.where(type: "Activities::MilestoneCreate")
    activities.destroy_all
  end
end
