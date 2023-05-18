class AddUuuiToActivities < ActiveRecord::Migration[7.0]
  def change
    add_column :activities, :uuid, :uuid, default: "gen_random_uuid()", index: true, null: false
  end
end
