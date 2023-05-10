module Activities
  class TokenLaunch < Activity
    store :content, accessors: %i[
      message
    ], coder: JSON

    def self.generate_content(origin_user_id, _)
      origin_user = User.find(origin_user_id)

      message = "#{origin_user.name} just launched their token $#{origin_user.talent.talent_token.ticker}!"

      JSON.generate(message: message)
    end
  end
end
