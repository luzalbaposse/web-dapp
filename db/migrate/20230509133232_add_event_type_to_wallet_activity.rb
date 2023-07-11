class AddEventTypeToWalletActivity < ActiveRecord::Migration[7.0]
  def change
    add_column :wallet_activities, :event_type, :string
  end
end
