class AddWalletIdToVotes < ActiveRecord::Migration[7.0]
  def change
    add_column :votes, :wallet_id, :string
    change_column_null :votes, :voter_id, true
  end
end
