require "csv"

namespace :talent_supporters do
  desc "Add values for approximate amount so that we can sort by it"
  task migrate_approximate_amount: :environment do
    decimals = "1#{"0" * 18}"
    puts "Updating talent supporters #{TalentSupporter.count}"
    TalentSupporter.find_each do |talent_supporter|
      puts "Updating talent supporter #{talent_supporter.id}"
      approx_amount = talent_supporter.amount.to_f / decimals.to_f

      talent_supporter.update!(approximate_amount: approx_amount)
    end
    puts "done."
  end
end
