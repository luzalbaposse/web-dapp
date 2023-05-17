namespace :activity do
  desc "Migrate all activity messages to new format"
  task migrate_messages: :environment do
    activities = Activity.where.not(type: "Activities::CareerUpdate").count
    Activity.where.not(type: "Activities::CareerUpdate").find_each.with_index do |activity, index|
      activity.message = activity.type.constantize.generate_content(activity.origin_user_id, activity.target_user_id)
      if index % 100 == 0 # Adjust this number depending on the size of your user base for more or less frequent logging.
        puts "Processed #{index} out of #{activities} activities."
      end
    end
    puts "Done. Processed a total of #{activities} activities."
  end
end
