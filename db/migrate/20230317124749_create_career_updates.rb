class CreateCareerUpdates < ActiveRecord::Migration[7.0]
  def change
    create_table :career_updates do |t|
      t.references :user, null: false, foreign_key: true
      t.uuid :uuid, default: "gen_random_uuid()", index: true, null: false, unique: true
      t.text :text_ciphertext, null: false

      t.timestamps
    end
  end
end
