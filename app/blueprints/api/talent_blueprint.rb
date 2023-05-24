class API::TalentBlueprint < Blueprinter::Base
  view :normal do
    fields :username, :name, :email, :profile_picture_url

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

  view :subscriber do
    include_view :normal

    field :verified do |user, _options|
      user.talent&.verified?
    end

    field :occupation do |user, _options|
      user.talent&.occupation
    end

    field :banner_url do |user, _options|
      user.talent&.banner_url
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
end
