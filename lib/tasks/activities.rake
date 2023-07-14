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
