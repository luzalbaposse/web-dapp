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

    field :about do |user, _options|
      user.talent&.about
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
    include_view :with_connections_count

    field :ticker do |user, _options|
      user.talent&.talent_token&.ticker
    end
  end

  view :with_connections_count do
    field :supporters_count do |user, options|
      user.connections.where("connection_types && ?", "{sponsor,staker}").count
    end

    field :supporting_count do |user, _options|
      user.connections.where("connection_types && ?", "{sponsoring,staking}").count
    end

    field :subscribers_count do |user, _options|
      user.connections.where("connection_types && ?", "{subscriber}").count
    end

    field :subscribing_count do |user, _options|
      user.connections.where("connection_types && ?", "{subscribing}").count
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

  view :with_subscribe_status do
    include_view :normal

    field :subscribed_status do |user, options|
      subscription = Subscription.find_by(user: user, subscriber: User.find_by(id: options[:current_user_id]))

      if subscription.present?
        if subscription.accepted_at.present?
          "Unsubscribe"
        else
          "Cancel request"
        end
      elsif !!user.active_subscribing.pluck(:user_id)&.include?(options[:current_user_id])
        "Subscribe back"
      else
        "Subscribe"
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
    include_view :with_subscribe_status

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

    field :is_subscribing do |user, options|
      !!user.active_subscribing.pluck(:user_id)&.include?(options[:current_user_id])
    end

    field :is_supporting do |user, options|
      status = false
      current_user = User.find_by(id: options[:current_user_id])
      supporting = TalentSupporter.where(
        supporter_wallet_id: user.wallet_id,
        talent_contract_id: current_user&.talent&.talent_token&.contract_id
      ).count > 0
      sponsoring = Sponsorship.where(sponsor: user.wallet_id, talent: current_user&.wallet_id).count > 0

      if supporting || sponsoring
        status = true
      end

      status
    end

    field :updates_length do |user, options|
      user.origin_activities.where(type: "Activities::CareerUpdate").count
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

    field :about do |user, _options|
      user.talent&.about
    end

    association :milestone, blueprint: API::MilestoneBlueprint, view: :with_images, name: :current_position do |user, options|
      position = user.talent.milestones.where(in_progress: true, category: "Position").order(start_date: :desc).includes(:milestone_images)&.first
      position ||= user.talent.milestones.where(end_date: nil, category: "Position").order(start_date: :desc).includes(:milestone_images)&.first
      position ||= user.talent.milestones.where(end_date: nil, category: "Education").order(start_date: :desc).includes(:milestone_images)&.first
      position
    end
  end

  view :support do
    include_view :with_connections_count
    include_view :with_subscribe_status

    fields :username, :profile_picture_url

    field :name do |user, _options|
      user.name
    end

    field :total_supply do |user, options|
      user.talent&.total_supply
    end

    field :max_supply do
      Talent.max_supply.to_s
    end

    field :market_cap do |user, options|
      user.talent&.market_cap
    end

    field :market_cap_variance do |user, options|
      user.talent&.market_cap_variance
    end

    field :goals_count do |user, _options|
      user.talent.career_goal&.goals&.count
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
