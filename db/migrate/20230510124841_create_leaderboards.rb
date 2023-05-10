class CreateLeaderboards < ActiveRecord::Migration[7.0]
  def change
    create_table :leaderboards do |t|
      t.references :race, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.integer :score, null: false, default: 0

      t.timestamps
    end
  end
end
