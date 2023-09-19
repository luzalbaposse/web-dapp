class CreateUserWeb3Infos < ActiveRecord::Migration[7.0]
  def change
    create_table :user_web3_infos do |t|
      t.references :user, null: false, foreign_key: true
      t.string :galxe_passport_token_id
      t.timestamp :web3_refreshed_at

      t.timestamps
    end
  end
end
