namespace :db do
  desc "Create feeds for all users"
  task create_feeds: :environment do
    total_users = User.count
    User.find_each.with_index do |user, index|
      ActivityFeed.find_or_create_by(user: user)
      if index % 100 == 0 # Adjust this number depending on the size of your user base for more or less frequent logging.
        puts "Processed #{index} out of #{total_users} users."
      end
    end
    puts "Done. Processed a total of #{total_users} users."
  end
end
