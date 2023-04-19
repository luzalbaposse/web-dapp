class CreateUserProductAnnouncements < ActiveRecord::Migration[7.0]
  def change
    create_table :user_product_announcements do |t|
      t.uuid :id, default: "gen_random_uuid()", index: true, null: false, unique: true
      t.references :user, null: false, foreign_key: true
      t.references :product_announcement, null: false, foreign_key: true
      t.timestamp :read_at

      t.timestamps
    end
  end
end
