class API::LeaderboardBlueprint < Blueprinter::Base
  view :normal do
    fields :score

    association :user, blueprint: API::TalentBlueprint, view: :normal
  end
end
