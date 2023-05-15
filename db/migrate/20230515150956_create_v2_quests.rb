class CreateV2Quests < ActiveRecord::Migration[7.0]
  def change
    create_table :v2_quests do |t|
      t.uuid :uuid, default: "gen_random_uuid()", index: true, null: false, unique: true
      t.integer :participation_points_amount, null: false
      t.string :title, null: false
      t.string :description, null: false

      t.timestamps
    end
  end
end
