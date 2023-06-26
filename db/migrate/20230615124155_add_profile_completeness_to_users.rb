class AddProfileCompletenessToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :profile_completeness, :decimal, default: 0
  end
end
