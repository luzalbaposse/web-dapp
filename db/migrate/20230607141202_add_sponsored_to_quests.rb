class AddSponsoredToQuests < ActiveRecord::Migration[7.0]
  def change
    add_column :quests, :sponsored, :boolean, default: false
  end
end
