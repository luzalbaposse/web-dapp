class CreateExperienceRewards < ActiveRecord::Migration[7.0]
  def change
    create_table :experience_rewards do |t|
      t.uuid :uuid, default: "gen_random_uuid()", index: true, null: false, unique: true
      t.text :image_data
      t.string :title, null: false
      t.string :description, null: false
      t.integer :cost, null: false
      t.integer :stock, default: 0
      t.boolean :active, null: false, default: true
      t.string :type, null: false

      t.timestamps
    end
  end
end
