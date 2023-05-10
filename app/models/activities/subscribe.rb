module Activities
  class Subscribe < Activity
    store :content, accessors: %i[
      message
    ], coder: JSON

    def self.generate_content(origin_user_id, target_user_id)
      origin_user = User.find(origin_user_id)
      target_user = User.find(target_user_id)

      message = "#{origin_user.name} just started subscribing to #{target_user.name}!"

      JSON.generate(message: message)
    end
  end
end
