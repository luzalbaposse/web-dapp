class RenameParticipationPointsToExperiencePoints < ActiveRecord::Migration[7.0]
  def change
    rename_table :participation_points, :experience_points
    rename_column :v2_quests, :participation_points_amount, :experience_points_amount
    rename_column :user_v2_quests, :credited_amount, :credited_experience_points_amount
  end
end
