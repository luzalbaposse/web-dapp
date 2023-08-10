class AddTxHashToRewards < ActiveRecord::Migration[7.0]
  def change
    add_column :rewards, :tx_hash, :string
  end
end
