class AddTalentMateWhitelistedToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :talent_mate_whitelisted_at, :datetime
  end
end
