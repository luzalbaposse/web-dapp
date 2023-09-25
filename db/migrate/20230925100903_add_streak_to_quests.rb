class AddStreakToQuests < ActiveRecord::Migration[7.0]
  def change
    add_column :quests, :streak, :boolean, default: false, null: false
  end
end
