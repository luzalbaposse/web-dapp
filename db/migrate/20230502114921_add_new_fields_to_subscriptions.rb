class AddNewFieldsToSubscriptions < ActiveRecord::Migration[7.0]
  def change
    add_column :subscriptions, :uuid, :uuid, default: "gen_random_uuid()", index: true, null: false
    add_column :subscriptions, :subscribed_back_status, :string, default: "no_request"
  end
end
