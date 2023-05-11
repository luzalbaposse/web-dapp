module Activities
  class Stake < Activity
    store :content, accessors: %i[
      message
    ], coder: JSON

    def self.generate_content(origin_user_id, target_user_id)
      origin_user = User.find(origin_user_id)
      target_user = User.find(target_user_id)

      "#{origin_user.name} just staked on #{target_user.name}!"
    end
  end
end
