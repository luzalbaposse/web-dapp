class CreateSponsorships < ActiveRecord::Migration[7.0]
  def change
    create_table :sponsorships do |t|
      t.string :sponsor, null: false
      t.string :talent, null: false
      t.bigint :amount, null: false
      t.string :token, null: false
      t.string :symbol, null: false
      t.string :tx_hash, null: false
      t.integer :chain_id, null: false

      t.timestamps
    end

    add_index :sponsorships, [:tx_hash, :chain_id], unique: true
  end
end
