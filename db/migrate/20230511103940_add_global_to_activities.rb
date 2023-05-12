class AddGlobalToActivities < ActiveRecord::Migration[7.0]
  def change
    add_column :activities, :global, :boolean, default: false
  end
end
