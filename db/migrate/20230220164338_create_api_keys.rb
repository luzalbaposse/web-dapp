class CreateAPIKeys < ActiveRecord::Migration[7.0]
  def change
    create_table :api_keys do |t|
      t.text :access_key, null: false
      t.string :name, null: false
      t.string :description
      t.timestamp :activated_at
      t.timestamp :revoked_at
      t.string :revoked_reason

      t.timestamps
    end
  end
end
