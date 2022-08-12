class AddLinkedinIdToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :linkedin_id, :string, null: true
    add_index :users, :linkedin_id, unique: true
  end
end
