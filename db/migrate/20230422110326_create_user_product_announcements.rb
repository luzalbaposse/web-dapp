class CreateUserProductAnnouncements < ActiveRecord::Migration[7.0]
  def change
    create_table :user_product_announcements do |t|
      t.uuid :uuid, default: "gen_random_uuid()", index: true, null: false, unique: true
      t.references :user, foreign_key: true, null: false
      t.references :product_announcement, foreign_key: true, null: false
      t.timestamp :read_at

      t.timestamps
    end
  end
end
