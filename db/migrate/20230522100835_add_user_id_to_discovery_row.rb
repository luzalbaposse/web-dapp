class AddUserIdToDiscoveryRow < ActiveRecord::Migration[7.0]
  def change
    add_reference :discovery_rows, :user, optional: true, foreign_key: true
  end
end
