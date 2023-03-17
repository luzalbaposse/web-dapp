class AddCareerUpdateToMessages < ActiveRecord::Migration[7.0]
  def change
    add_reference :messages, :career_update, foreign_key: true
  end
end
