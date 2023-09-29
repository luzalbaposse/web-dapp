class AddLinksToElections < ActiveRecord::Migration[7.0]
  def change
    add_column :elections, :terms_and_conditions_url, :string
    add_column :elections, :learn_more_url, :string
  end
end
