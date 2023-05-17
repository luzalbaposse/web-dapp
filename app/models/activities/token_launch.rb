module Activities
  class TokenLaunch < Activity
    store :content, accessors: %i[
      message
    ], coder: JSON

    def self.generate_content(origin_user_id, _)
      origin_user = User.find(origin_user_id)

      # @origin is replaced with the name of the user on the frontend
      "@origin just launched their token $#{origin_user.talent.talent_token.ticker}!"
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
