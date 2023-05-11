class AddUuidToRaces < ActiveRecord::Migration[7.0]
  def change
    add_column :races, :uuid, :uuid, default: "gen_random_uuid()", index: true, null: false
  end
end
