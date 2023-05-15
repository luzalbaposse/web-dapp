class API::ActivityBlueprint < Blueprinter::Base
  view :normal do
    fields :created_at, :id, :content, :type

    association :origin_user, blueprint: API::TalentBlueprint, view: :normal
    association :target_user, blueprint: API::TalentBlueprint, view: :normal
  end
end
