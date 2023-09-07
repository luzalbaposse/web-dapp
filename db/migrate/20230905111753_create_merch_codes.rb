class CreateMerchCodes < ActiveRecord::Migration[7.0]
  def change
    create_table :merch_codes do |t|
      t.references :experience_reward, null: false, foreign_key: true
      t.string :code
      t.boolean :assigned, default: false
      t.references :user, null: true, foreign_key: true

      t.timestamps
    end
  end
end
