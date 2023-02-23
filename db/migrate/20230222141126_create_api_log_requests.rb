class CreateAPILogRequests < ActiveRecord::Migration[7.0]
  def change
    create_table :api_log_requests do |t|
      t.text :ip_ciphertext, null: false
      t.string :ip_bidx, index: true

      t.string :method
      t.string :path
      t.jsonb :request_body
      t.jsonb :response_body
      t.integer :response_code

      t.references :api_key, null: false, foreign_key: true, index: true

      t.timestamps
    end
  end
end
