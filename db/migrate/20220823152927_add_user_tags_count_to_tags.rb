class AddUserTagsCountToTags < ActiveRecord::Migration[6.1]
  def change
    add_column :tags, :user_tags_count, :integer, null: false, default: 0
  end
end
