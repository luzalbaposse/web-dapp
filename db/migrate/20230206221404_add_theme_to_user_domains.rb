class AddThemeToUserDomains < ActiveRecord::Migration[7.0]
  def change
    add_column :user_domains, :theme, :string, default: "light"
  end
end
