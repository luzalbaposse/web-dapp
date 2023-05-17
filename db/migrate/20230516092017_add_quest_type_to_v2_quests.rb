class AddQuestTypeToV2Quests < ActiveRecord::Migration[7.0]
  def change
    add_column :v2_quests, :quest_type, :string, null: false
    add_index :v2_quests, :quest_type, unique: true
  end
end
