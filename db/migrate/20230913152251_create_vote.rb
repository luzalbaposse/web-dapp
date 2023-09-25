class CreateVote < ActiveRecord::Migration[7.0]
  def change
    create_table :votes do |t|
      t.references :election, null: false, foreign_key: true
      t.references :candidate, null: false, foreign_key: {to_table: :users}
      t.references :voter, null: false, foreign_key: {to_table: :users}
      t.integer :amount, null: false, default: 0
      t.string :cost, null: false

      t.timestamps
    end
  end
end
