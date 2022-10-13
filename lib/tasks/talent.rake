namespace :talent do
  task upgrade_to_applying: :environment do
    users = User.left_joins(:talent).where(talent: {id: nil})
    count = users.count
    users.find_each.with_index do |user, index|
      puts "User #{index}/#{count}"
      Supporter::UpgradeToTalent.new.call(user: user, applying: true, sync_mailerlite: false)
    end
  end
end
