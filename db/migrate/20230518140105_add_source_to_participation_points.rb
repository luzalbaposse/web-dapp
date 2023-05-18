class AddSourceToParticipationPoints < ActiveRecord::Migration[7.0]
  def change
    add_reference :participation_points, :source, polymorphic: true, null: false
  end
end
