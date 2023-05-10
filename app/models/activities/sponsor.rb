module Activities
  class Sponsor < Activity
    store :content, accessors: %i[
      message
    ], coder: JSON

    def self.generate_content(origin_user_id, target_user_id)
      origin_user = User.find(origin_user_id)
      target_user = User.find(target_user_id)

      message = "#{origin_user.name} just sponsored #{target_user.name}!"

      JSON.generate(message: message)
    end
  end
end
