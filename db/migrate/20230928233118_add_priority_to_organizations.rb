class AddPriorityToOrganizations < ActiveRecord::Migration[7.0]
  def change
    add_column :organizations, :priority, :integer
    add_index :organizations, :priority, unique: true
  end
end
