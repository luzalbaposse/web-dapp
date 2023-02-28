class AddUuidToConnections < ActiveRecord::Migration[7.0]
  def change
    add_column :connections, :uuid, :uuid, default: "gen_random_uuid()", index: true, null: false
  end
end
