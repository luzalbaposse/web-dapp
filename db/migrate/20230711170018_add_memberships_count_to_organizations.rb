class AddMembershipsCountToOrganizations < ActiveRecord::Migration[7.0]
  def change
    add_column :organizations, :memberships_count, :integer, null: false, default: 0
  end
end
