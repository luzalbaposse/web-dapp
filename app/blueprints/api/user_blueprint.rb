class API::UserBlueprint < Blueprinter::Base
  view :simple do
    fields :username, :profile_picture_url

    field :id do |user, _options|
      user.uuid
    end
  end

  view :card do
    fields :username, :name, :profile_picture_url

    field :id do |user, _options|
      user.uuid
    end

    field :occupation do |user, _options|
      user.talent&.occupation
    end

    field :verified do |user, _options|
      user.talent&.verified?
    end

    field :vote_count do |user, options|
      if options[:with_vote_count]
        Vote.where(candidate_id: user.id).sum(&:amount)
      end
    end
  end

  view :normal do
    fields :username, :name, :email, :profile_picture_url, :messaging_disabled, :profile_type, :experience_points_amount

    field :id do |user, _options|
      user.uuid
    end

    field :talent_id do |user, _options|
      user.talent&.id
    end

    field :career_goal_id do |user, _options|
      user.talent&.career_goal&.id
    end

    field :wallet_address do |user, _options|
      user.wallet_id
    end

    field :admin do |user, _options|
      user.admin?
    end

    field :moderator do |user, _options|
      user.moderator?
    end

    field :verified do |user, _options|
      user.talent&.verified?
    end

    field :impersonated do |user, options|
      options[:impersonated]
    end

    field :active_supporter do |user, options|
      user.active_supporter?
    end

    field :supporters_count do |user, options|
      user.talent&.supporters_count || 0
    end

    field :token_launched do |user, options|
      user.talent&.talent_token&.deployed
    end

    field :ticker do |user, options|
      user.talent&.talent_token&.ticker
    end

    field :profile_completed do |user, _options|
      user.profile_completed_at.present?
    end

    field :required_profile_fields do |user, _options|
      User::REQUIRED_PROFILE_FIELDS
    end

    field :missing_profile_fields do |user, _options|
      user.missing_profile_fields
    end

    field :occupation do |user, _options|
      user.talent&.occupation
    end

    association :goals, blueprint: API::GoalBlueprint, view: :normal do |user, _options|
      if user.talent.career_goal.present?
        user.talent.career_goal.goals
      else
        []
      end
    end
  end
end
