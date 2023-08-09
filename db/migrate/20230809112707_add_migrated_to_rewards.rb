class AddMigratedToRewards < ActiveRecord::Migration[7.0]
  def change
    add_column :rewards, :migrated_at, :datetime, default: nil
  end
end
