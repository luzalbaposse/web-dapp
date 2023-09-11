class ChangeColumnNullForCareerGoalsRelations < ActiveRecord::Migration[7.0]
  def change
    change_column_null :goals, :career_goal_id, true
    change_column_null :career_needs, :career_goal_id, true
  end
end
