module ExperienceRewards
  class Cap < ExperienceReward
    def give_reward(user)
      merch_code = merch_codes.assignable.take
      return if merch_code.nil?

      merch_code.update!(assigned: true, user_id: user.id)

      merch_code.code
    end
  end
end
