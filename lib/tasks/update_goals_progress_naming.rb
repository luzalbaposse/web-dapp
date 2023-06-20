namespace :goals do
  task update_progress_naming: :environment do
    new_mapping = {
      planned: "planned",
      executing: "doing",
      accomplished: "accomplished",
      not_accomplished: "abandoned",
      abandoned: "abandoned"
    }

    Goal.find_each do |goal|
      next unless goal.progress

      goal.update!(progress: new_mapping.stringify_keys![goal.progress])
    end
  end
end
