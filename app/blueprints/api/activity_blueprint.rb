class API::ActivityBlueprint < Blueprinter::Base
  view :normal do
    fields :created_at, :id, :content, :activity_type_id

    association :origin_user, blueprint: API::TalentBlueprint, view: :normal
    association :target_user, blueprint: API::TalentBlueprint, view: :normal
  end
end
