class AddDecimalsToSponsorships < ActiveRecord::Migration[7.0]
  def change
    add_column :sponsorships, :token_decimals, :integer, default: 18
  end
end
