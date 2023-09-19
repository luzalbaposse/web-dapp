class AddTalRewardToQuests < ActiveRecord::Migration[7.0]
  def change
    add_column :quests, :tal_reward, :integer, default: 0
  end
end
