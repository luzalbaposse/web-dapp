namespace :db do
  desc "Sets all non-career update activies as global"
  task update_global_activities: :environment do
    Activity.where.not(type: "Activity::CareerUpdate").update_all(global: true)
  end
end
