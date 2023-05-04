class AddUtmSourceToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :utm_source, :string
  end
end
