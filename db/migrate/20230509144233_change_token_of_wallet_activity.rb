class ChangeTokenOfWalletActivity < ActiveRecord::Migration[7.0]
  def change
    remove_column :wallet_activities, :token
    add_column :wallet_activities, :token, :string
  end
end
