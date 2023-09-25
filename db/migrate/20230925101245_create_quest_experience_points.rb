class CreateQuestExperiencePoints < ActiveRecord::Migration[7.0]
  def change
    create_table :quest_experience_points do |t|
      t.integer :amount, null: false
      t.references :quest, foreign_key: true, index: true, null: false
      t.string :rule

      t.timestamps
    end

    add_index :quest_experience_points, [:quest_id, :rule], unique: true

    change_column_null :quests, :experience_points_amount, true
  end
end
