class CreateCareerUpdateAssociations < ActiveRecord::Migration[7.0]
  def change
    create_table :career_update_associations do |t|
      t.references :career_update, null: false, foreign_key: true
      t.references :associable_entity, polymorphic: true, null: false

      t.timestamps
    end
  end
end
