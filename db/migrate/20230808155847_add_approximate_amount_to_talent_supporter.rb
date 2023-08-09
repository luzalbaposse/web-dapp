class AddApproximateAmountToTalentSupporter < ActiveRecord::Migration[7.0]
  def change
    add_column :talent_supporters, :approximate_amount, :float
  end
end
