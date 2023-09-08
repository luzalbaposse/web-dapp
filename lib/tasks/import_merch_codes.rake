require "csv"

namespace :merch_codes do
  # rake "merch_codes:import[https://gist.githubusercontent.com/RubenSousaDinis/f16d127003fb29e14bd98815c918c480/raw/7a4c2f6581237e7fb5545d62bca6dfc11c7e0b1d/template.csv, 1]"
  task :import, [:csv_file_path, :id] => :environment do |_t, args|
    puts "Starting import"
    csv_path = args.csv_file_path
    unless csv_path.match?(/.?.csv/)
      raise "Invalid CSV file"
    end

    experience_reward = ExperienceReward.find(args.id)
    csv_data = csv_path.starts_with?("http") ? URI.parse(csv_path).read : File.read(csv_path)

    rows = CSV.parse(csv_data, headers: true)

    puts "CSV read, processing..."
    rows.each do |row|
      experience_reward.merch_codes.create!(code: row["code"])
    end

    puts "All done."
  end
end
