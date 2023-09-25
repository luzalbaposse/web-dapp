class AddTxHashToVotes < ActiveRecord::Migration[7.0]
  def change
    add_column :votes, :tx_hash, :string
    add_column :votes, :chain_id, :integer
  end
end
