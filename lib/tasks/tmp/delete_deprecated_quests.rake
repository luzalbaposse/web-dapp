namespace :quests do
  task delete_deprecated: :environment do
    quests = Quest.where(type: ["Quests::Ambassador", "Quests::Scout"])
    Task.where(quest: quests).delete_all
    quests.delete_all
  end
end
