class CreateProductAnnouncements < ActiveRecord::Migration[7.0]
  def change
    create_table :product_announcements do |t|
      t.uuid :uuid, default: "gen_random_uuid()", index: true, null: false, unique: true
      t.string :title, null: false
      t.text :content, null: false
      t.text :image_data
      t.string :link

      t.timestamps
    end
  end
end
