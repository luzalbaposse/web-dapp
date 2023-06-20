class AddHumanityVerifiedToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :humanity_verified_at, :datetime
    add_column :users, :humanity_proof, :jsonb
  end
end
