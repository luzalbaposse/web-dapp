class DropActivityTypes < ActiveRecord::Migration[7.0]
  def up
    drop_table :activity_types
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
