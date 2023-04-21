class CreateActivities < ActiveRecord::Migration[7.0]
  def change
    create_table :activities do |t|
      t.references :activity_type, foreign_key: true, null: false, index: true
      t.string :content, null: false
      t.references :origin_user, foreign_key: {to_table: :users}, null: false
      t.references :target_user, foreign_key: {to_table: :users}

      t.timestamps
    end
  end
end
