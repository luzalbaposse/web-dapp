class ChangeColumnNullForUserGoals < ActiveRecord::Migration[7.0]
  def change
    change_column_null :goals, :user_id, false
  end
end
