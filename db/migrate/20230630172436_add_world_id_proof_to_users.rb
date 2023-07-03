class AddWorldIdProofToUsers < ActiveRecord::Migration[7.0]
  def change
    change_column :users, :humanity_proof, :string
    add_index :users, :humanity_proof, unique: true
  end
end
