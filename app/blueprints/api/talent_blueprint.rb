class API::TalentBlueprint < Blueprinter::Base
  view :normal do
    fields :username, :name, :email, :profile_picture_url

    field :wallet_address do |user, _options|
      user.wallet_id
    end

    field :headline do |user, _options|
      user.talent&.headline
    end

    field :occupation do |user, _options|
      user.talent&.occupation
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
end
