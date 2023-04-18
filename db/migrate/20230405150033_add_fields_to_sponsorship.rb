class AddFieldsToSponsorship < ActiveRecord::Migration[7.0]
  def change
    add_column :sponsorships, :claimed_at, :timestamp
    add_column :sponsorships, :revoked_at, :timestamp
    add_column :sponsorships, :uuid, :uuid, default: "gen_random_uuid()", index: true, null: false
    add_column :sponsorships, :transactions, :string, array: true, default: []
    remove_column :sponsorships, :tx_hash, :string
  end
end
