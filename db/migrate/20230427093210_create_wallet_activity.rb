class CreateWalletActivity < ActiveRecord::Migration[7.0]
  def change
    create_table :wallet_activities do |t|
      t.string :wallet, null: false
      t.timestamp :tx_date, null: false
      t.bigint :token, null: false
      t.string :symbol, null: false
      t.string :tx_hash, null: false
      t.integer :chain_id, null: false

      t.timestamps
    end

    add_reference :wallet_activities, :user, foreign_key: true
  end
end
