class DropCareerGoals < ActiveRecord::Migration[7.0]
  def change
    drop_table :career_goals
  end
end
