class API::TalentBlueprint < Blueprinter::Base
  view :normal do
    fields :username, :name, :email, :profile_picture_url

    field :wallet_address do |user, _options|
      user.wallet_id
    end
  end
end
