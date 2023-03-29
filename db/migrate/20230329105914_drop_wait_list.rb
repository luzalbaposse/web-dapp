class DropWaitList < ActiveRecord::Migration[7.0]
  def change
    drop_table :wait_list
  end
end
