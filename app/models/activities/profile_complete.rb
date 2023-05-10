module Activities
  class ProfileComplete < Activity
    store :content, accessors: %i[
      message
    ], coder: JSON

    def self.generate_content(origin_user_id, _)
      origin_user = User.find(origin_user_id)

      message = "#{origin_user.name} just joined Talent Protocol!"

      JSON.generate(message: message)
    end
  end
end
