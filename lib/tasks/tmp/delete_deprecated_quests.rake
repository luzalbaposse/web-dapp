namespace :quests do
  task delete_deprecated: :environment do
    quests = Quest.where(type: ["Quests::Ambassador", "Quests::Scout"])
    Task.where(quest: quest).delete_all
    quests.delete_all
  end
end
