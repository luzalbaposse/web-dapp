class API::TalentBlueprint < Blueprinter::Base
  view :normal do
    fields :username, :name, :email, :profile_picture_url

    field :wallet_address do |user, _options|
      user.wallet_id
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

    field :followers_count do |user, _options|
      user.followers.count
    end

    field :following_count do |user, _options|
      user.following.count
    end
  end
end
