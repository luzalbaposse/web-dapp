module Activities
  class ProfileComplete < Activity
    store :content, accessors: %i[
      message
    ], coder: JSON

    def self.generate_content(origin_user_id, _)
      origin_user = User.find(origin_user_id)

      "#{origin_user.name} just joined Talent Protocol!"
    end

    def self.default_global_scope
      true
    end
  end
end
