class API::UserBlueprint < Blueprinter::Base
  view :normal do
    fields :username, :name, :email, :profile_picture_url, :messaging_disabled

    field :id do |user, _options|
      user.uuid
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

    field :impersonated do |user, options|
      options[:impersonated]
    end

    field :supporters_count do |user, options|
      user.talent&.supporters_count || 0
    end
  end
end
