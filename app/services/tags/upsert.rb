module Tags
  class Upsert
    class Error < StandardError; end

    def call(user:, tags:)
      ActiveRecord::Base.transaction do
        user
          .user_tags
          .joins(:tag)
          .where(tag: {hidden: false})
          .where.not(tag: {description: tags})
          .delete_all

        tags.each do |description|
          tag = Tag.find_or_create_by(description: description.downcase)
          user_tag = UserTag.find_or_initialize_by(user: user, tag: tag)

          user_tag.save! unless user_tag.persisted?
        end
      end
    end
  end
end
