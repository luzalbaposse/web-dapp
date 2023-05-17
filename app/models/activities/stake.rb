module Activities
  class Stake < Activity
    store :content, accessors: %i[
      message
    ], coder: JSON

    def self.generate_content(_, _)
      # @origin & @target are replaced with the names of the users on the frontend
      "@origin just staked on @target"
    end

    def self.default_global_scope
      true
    end

    def message_with_names
      origin_user = User.find(origin_user_id)
      target_user = User.find(target_user_id)

      message.sub("@origin", origin_user.name).sub("@target", target_user.name)
    end
  end
end
