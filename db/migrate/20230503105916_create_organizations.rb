class CreateOrganizations < ActiveRecord::Migration[7.0]
  def change
    create_table :organizations do |t|
      t.string :name, null: false
      t.string :url
      t.text :description
      t.text :logo_data
      t.boolean :verified, default: false
      t.string :type, null: false
      t.text :banner_data
      t.string :location

      t.timestamps
    end
  end
end
