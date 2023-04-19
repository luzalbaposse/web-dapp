class ChangeSponsorshipAmountType < ActiveRecord::Migration[7.0]
  def change
    change_column :sponsorships, :amount, :string
  end
end
