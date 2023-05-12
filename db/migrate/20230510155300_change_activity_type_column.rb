class ChangeActivityTypeColumn < ActiveRecord::Migration[7.0]
  def change
    remove_column :activities, :activity_type_id
    add_column :activities, :type, :string
  end
end
