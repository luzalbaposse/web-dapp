class AddNewToQuests < ActiveRecord::Migration[7.0]
  def change
    add_column :quests, :new, :boolean, default: true, null: false
  end
end
