class AddChainToTalentSupporters < ActiveRecord::Migration[7.0]
  def change
    add_column :talent_supporters, :chain_id, :integer
  end
end
