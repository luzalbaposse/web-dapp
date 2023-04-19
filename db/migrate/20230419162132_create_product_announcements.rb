class CreateProductAnnouncements < ActiveRecord::Migration[7.0]
  def change
    create_table :product_announcements do |t|
      t.string :title, null: false
      t.text :content, null: false
      t.text :image_data

      t.timestamps
    end
  end
end
