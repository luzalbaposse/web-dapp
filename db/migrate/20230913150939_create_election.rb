class CreateElection < ActiveRecord::Migration[7.0]
  def change
    create_table :elections do |t|
      t.date :start_date, null: false
      t.date :voting_start_date, null: false
      t.date :end_date, null: false
      t.references :organization, null: false, foreign_key: true
      t.boolean :rewards_distributed, null: false, default: false

      t.timestamps
    end
  end
end
