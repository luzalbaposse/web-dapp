class AddConnectionTypesToConnections < ActiveRecord::Migration[7.0]
  def change
    add_column :connections, :connection_types, :string, array: true, default: []
  end
end
