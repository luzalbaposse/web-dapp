class AddFieldsToSubscriptions < ActiveRecord::Migration[7.0]
  def change
    add_column :subscriptions, :accepted_at, :timestamp
  end
end
