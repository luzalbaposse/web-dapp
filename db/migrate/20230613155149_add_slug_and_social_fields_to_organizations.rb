class AddSlugAndSocialFieldsToOrganizations < ActiveRecord::Migration[7.0]
  def change
    add_column :organizations, :slug, :string, null: false
    add_column :organizations, :discord, :string
    add_column :organizations, :github, :string
    add_column :organizations, :linkedin, :string
    add_column :organizations, :telegram, :string
    add_column :organizations, :twitter, :string

    rename_column :organizations, :url, :website
  end
end
