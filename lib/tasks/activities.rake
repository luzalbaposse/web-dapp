namespace :activities do
  task migrate_default_messages: :environment do
    desc "Migrate all activity messages to new default format"

    activities = Activity
      .where.not(type: [
        "Activities::CareerUpdate",
        "Activities::GoalCreate",
        "Activities::GoalUpdate",
        "Activities::Sponsor"
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

  task migrate_sponsor_activities: :environment do
    desc "Migrate all sponsor activity messages to new format"

    activities = Activity.where(type: "Activities::Sponsor")
    count = activities.count

    activities.find_each.with_index do |activity, index|
      sponsorship = Sponsorship.find_by(
        sponsor: User.find(activity.origin_user_id).wallet_id,
        talent: User.find(activity.target_user_id).wallet_id
      )

      if sponsorship.symbol != "G$"
        decimals = "1"
        sponsorship.token_decimals.times { decimals << "0" }
        invested = sponsorship.amount.to_f / decimals.to_f

        pattern = /[.]/
        replacement = " with $#{invested}."

        activity.message = activity.message.gsub(pattern, replacement)
      else
        activity.message = activity.type.constantize.generate_content(activity.origin_user_id, activity.target_user_id)
      end

      raise "Error while update activity #{activity.id}" unless activity.save!

      if index % 100 == 0 # Adjust this number depending on the size of your user base for more or less frequent logging.
        puts "Processed #{index} out of #{count} activities."
      end
    end
    puts "Done. Processed a total of #{count} activities."
  end

  task make_all_activities_public: :environment do
    desc "Make all acitivities public to everyone"

    Activity.where(global: false).update_all(global: true)

    puts "Done."
  end
end
