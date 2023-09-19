class AddElectionIdAndPinToGoals < ActiveRecord::Migration[7.0]
  def change
    add_reference :goals, :election, null: true, foreign_key: true
    add_column :goals, :pin, :boolean, default: false
  end
end
