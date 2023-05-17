module Activities
  class ProfileComplete < Activity
    store :content, accessors: %i[
      message
    ], coder: JSON

    def self.generate_content(_, _)
      # @origin is replaced with the name of the user on the frontend
      "@origin has joined Talent Protocol."
    end

    def self.default_global_scope
      true
    end

    def message_with_names
      origin_user = User.find(origin_user_id)

      message.sub("@origin", origin_user.name)
    end
  end
end
