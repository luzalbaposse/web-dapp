class AddOrganizationToInvites < ActiveRecord::Migration[7.0]
  def change
    add_reference :invites, :organization, foreign_key: true, index: true, null: true
  end
end
