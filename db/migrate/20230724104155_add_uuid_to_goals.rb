class AddUuidToGoals < ActiveRecord::Migration[7.0]
  def change
      add_column :goals, :uuid, :uuid, default: "gen_random_uuid()", index: true, null: false, unique: true
  end
end
