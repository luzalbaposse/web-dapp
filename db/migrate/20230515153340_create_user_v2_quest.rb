class CreateUserV2Quest < ActiveRecord::Migration[7.0]
  def change
    create_table :user_v2_quests do |t|
      t.references :user, null: false, foreign_key: true
      t.references :v2_quest, null: false, foreign_key: true
      t.timestamp :completed_at, null: false
      t.integer :credited_amount, null: false

      t.timestamps
    end

    add_index :user_v2_quests, [:user_id, :v2_quest_id], unique: true
  end
end
