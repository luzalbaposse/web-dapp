class RemoveOldQuests < ActiveRecord::Migration[7.0]
  def change
    drop_table :tasks
    drop_table :quests

    rename_table :v2_quests, :quests
    rename_table :user_v2_quests, :user_quests

    rename_column :user_quests, :v2_quest_id, :quest_id
  end
end
