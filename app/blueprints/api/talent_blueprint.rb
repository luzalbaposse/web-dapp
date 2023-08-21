class API::TalentBlueprint < Blueprinter::Base
  view :normal do
    fields :username, :email, :profile_picture_url

    field :id do |user, _options|
      user.uuid
    end

    field :name do |user, _options|
      user.name
    end

    field :wallet_address do |user, _options|
      user.wallet_id
    end

    field :headline do |user, _options|
      user.talent&.headline
    end

    field :occupation do |user, _options|
      user.talent&.occupation
    end

    field :verified do |user, _options|
      user.talent&.verified?
    end

    field :ticker do |user, _options|
      user.talent&.talent_token&.ticker
    end

    field :banner_url do |user, _options|
      user.talent&.banner_url
    end

    field :location do |user, _options|
      user.talent&.location
    end
  end

  view :detailed do
    include_view :normal

    field :supporters_count do |user, _options|
      user.supporters.count
    end

    field :supporting_count do |user, _options|
      user.portfolio.count
    end

    field :subscribers_count do |user, _options|
      user.subscribers.count
    end

    field :subscribing_count do |user, _options|
      user.users_subscribing.count
    end

    field :ticker do |user, _options|
      user.talent&.talent_token&.ticker
    end
  end

  view :invites do
    include_view :normal

    field :joined_at do |user, _options|
      user.created_at.to_s
    end

    field :experience_points_amount do |user, _options|
      (user.talent&.verified? && user.created_at >= ExperiencePoints::CreditInvitePoints::START_DATE) ? ExperiencePoints::CreditInvitePoints::AMOUNT : 0
    end

    field :tal_amount do |user, _options|
      if user.created_at < ExperiencePoints::CreditInvitePoints::START_DATE
        token_deployed_at = user.talent&.talent_token&.deployed_at
        (token_deployed_at && token_deployed_at < ExperiencePoints::CreditInvitePoints::START_DATE) ? 100 : 0
      else
        0
      end
    end

    field :status do |user, _options|
      verified = user&.talent&.verified
      token_deployed_at = user.talent&.talent_token&.deployed_at
      if user.created_at >= ExperiencePoints::CreditInvitePoints::START_DATE
        verified ? "Verified" : "Pending Verification"
      elsif token_deployed_at && token_deployed_at < ExperiencePoints::CreditInvitePoints::START_DATE
        "Token Launched"
      else
        "Pending Token Launch"
      end
    end
  end

  view :leaderboard do
    include_view :normal

    # Although score is not part of the user model this works since we're selecting the field in the controller
    field :score do |user, _options|
      user.score
    end
  end

  # ------------ temporary views for Profile V1.0 ------------
  view :overview do
    include_view :normal

    field :profile_type

    field :subscribing_status do |user, options|
      status = "unsubscribed"
      status = "subscribed" if options[:current_user_active_subscribing]&.include?(user.id)
      status = "subscribing" if user.active_subscribing.pluck(:user_id)&.include?(options[:current_user_id])
      if user.active_subscribing.pluck(:user_id)&.include?(options[:current_user_id]) && options[:current_user_active_subscribing]&.include?(user.id)
        status = "both_subscribed"
      end
      status = "pending" if options[:current_user_pending_subscribing]&.include?(user.id)
      status
    end

    field :updates_length do |user, options|
      user.origin_activities.where(type: "Activities::CareerUpdate").count
    end

    field :with_persona_id do |user, _options|
      user.talent&.with_persona_id
    end
  end

  view :about do
    field :username

    field :id do |user, _options|
      user.talent.id
    end

    field :tags do |user, _options|
      user.tags
    end

    field :social_links do |user, _options|
      [
        {link: user.talent.website, type: "Website"},
        {link: user.talent.github, type: "GitHub"},
        {link: user.talent.linkedin, type: "Linkedin"},
        {link: user.talent.twitter, type: "Twitter"},
        {link: user.talent.lens, type: "Lens"},
        {link: user.talent.mastodon, type: "Mastodon"},
        {link: user.talent.telegram, type: "Telegram"},
        {link: user.talent.discord, type: "Discord"}
      ]
    end

    field :current_position do |user, _options|
      user.talent.milestones.where(end_date: nil).order(start_date: :desc).first
    end

    association :milestones, blueprint: MilestoneBlueprint, view: :normal do |user, options|
      user.talent&.milestones&.includes(:milestone_images)
    end

    association :career_goal, blueprint: CareerGoalBlueprint, view: :normal do |user, options|
      user.talent&.career_goal
    end
  end

  view :support do
    field :username

    field :name do |user, _options|
      user.name
    end

    field :total_supply do |user, options|
      user.talent&.total_supply
    end

    field :max_supply do
      Talent.max_supply.to_s
    end

    field :supporters_count do |user, options|
      user.talent&.supporters_count
    end

    field :market_cap do |user, options|
      user.talent&.market_cap
    end

    field :market_cap_variance do |user, options|
      user.talent&.market_cap_variance
    end

    field :supporting_count do |user, _options|
      user.portfolio.count
    end

    field :subscribers_count do |user, _options|
      user.subscribers.count
    end

    field :subscribing_count do |user, _options|
      user.users_subscribing.count
    end

    field :goals_count do |user, _options|
      user.talent.career_goal.goals.count
    end

    field :updates_count do |user, _options|
      user.career_updates.count
    end

    field :connections_count do |user, _options|
      user.connections.count
    end

    association :talent_token, blueprint: TalentTokenBlueprint, view: :normal do |user, options|
      user.talent&.talent_token
    end
  end
  # ------------ temporary views for Profile V1.0 ------------
end
