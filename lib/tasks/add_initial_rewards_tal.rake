require "csv"

namespace :tal_rewards do
  # rake "rewards:import[https://gist.githubusercontent.com/RubenSousaDinis/f16d127003fb29e14bd98815c918c480/raw/7a4c2f6581237e7fb5545d62bca6dfc11c7e0b1d/template.csv]"
  task :add_initial_rewards, [:csv_file_path] => :environment do |_t, args|
    csv_path = args.csv_file_path
    unless csv_path.match?(/.?.csv/)
      raise "Invalid CSV file"
    end

    csv_data = csv_path.starts_with?("http") ? URI.parse(csv_path).read : File.read(csv_path)

    invalid_rewards = {}
    row_line = 1
    rows = CSV.parse(csv_data, headers: true)
    rows_count = rows.count
    creator = User.find_by(username: "leal")

    rows.each do |reward|
      messages = []

      if reward[:tx_hash].present?
        messages << "Reward already imported"
      end

      user = User.find_by(username: reward["username"]) || User.find_by(email: reward["email"])
      unless user
        messages << "User #{reward["username"] || reward["email"]} not found"
      end

      unless reward["identifier"]
        messages << "Identifier field is required"
      end

      unless reward["total_reward"]
        messages << "Amount field is required"
      end

      if messages.empty?
        reward = Reward.create(
          identifier: reward["identifier"],
          user: user,
          creator: creator,
          category: "contributor",
          reason: "Early contributor to Talent Protocol",
          amount: reward["total_reward"],
          imported: true
        )

        messages += reward.errors.full_messages if reward.errors.full_messages.any?
      end

      if messages.any?
        invalid_rewards[row_line] = messages
      else
        puts "Imported reward #{row_line} of #{rows_count}"
      end

      row_line += 1
    end

    if invalid_rewards.any?
      puts "##{invalid_rewards.count} - Invalid rewards not imported"
      puts invalid_rewards.inspect
    else
      puts "All imported successfully"
    end
  end
end
