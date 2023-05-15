class CreateParticipationPoints < ActiveRecord::Migration[7.0]
  def change
    create_table :participation_points do |t|
      t.references :user, null: false, foreign_key: true
      t.timestamp :credited_at, null: false
      t.uuid :uuid, default: "gen_random_uuid()", index: true, null: false, unique: true
      t.integer :amount, null: false
      t.string :description, null: false

      t.timestamps
    end
  end
end
