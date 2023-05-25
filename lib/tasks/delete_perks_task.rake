namespace :db do
  desc "Delete Tasks::Perks"
  task delete_perks_task: :environment do
    puts "deleting all Tasks::Perks"
    Task.where(type: "Tasks::Perks").delete_all
    puts "done"
  end
end
