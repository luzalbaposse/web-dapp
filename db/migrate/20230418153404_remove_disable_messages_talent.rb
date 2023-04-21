class RemoveDisableMessagesTalent < ActiveRecord::Migration[7.0]
  def change
    remove_column :talent, :disable_messages, :boolean
  end
end
