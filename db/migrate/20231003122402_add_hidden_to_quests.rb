class AddHiddenToQuests < ActiveRecord::Migration[7.0]
  def change
    add_column :quests, :hidden, :boolean, default: false
  end
end
