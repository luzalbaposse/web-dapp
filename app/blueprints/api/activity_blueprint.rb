class API::ActivityBlueprint < Blueprinter::Base
  view :normal do
    fields :created_at, :content, :type

    field :id do |activity, _options|
      activity.uuid
    end

    association :origin_user, blueprint: API::TalentBlueprint, view: :normal
    association :target_user, blueprint: API::TalentBlueprint, view: :normal
  end
end
