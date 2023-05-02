class API::SubscriptionsBlueprint < Blueprinter::Base
  view :normal do
    fields :subscribed_back_status

    field :id do |subscription, _options|
      subscription.uuid
    end

    field :username do |subscription, _options|
      subscription.subscriber.username
    end

    field :name do |subscription, _options|
      subscription.subscriber.name
    end

    field :email do |subscription, _options|
      subscription.subscriber.email
    end

    field :profile_picture_url do |subscription, _options|
      subscription.subscriber.profile_picture_url
    end

    field :wallet_address do |subscription, _options|
      subscription.subscriber.wallet_id
    end

    field :headline do |subscription, _options|
      subscription.subscriber.talent&.headline
    end

    field :occupation do |subscription, _options|
      subscription.subscriber.talent&.occupation
    end

    field :ticker do |subscription, _options|
      subscription.subscriber.talent&.talent_token&.ticker
    end
  end

  view :detailed do
    include_view :normal

    field :verified do |subscription, _options|
      subscription.subscriber.talent&.verified?
    end

    field :occupation do |subscription, _options|
      subscription.subscriber.talent&.occupation
    end

    field :banner_url do |subscription, _options|
      subscription.subscriber.talent&.banner_url
    end

    field :ticker do |subscription, _options|
      subscription.subscriber.talent&.talent_token&.ticker
    end
  end
end
