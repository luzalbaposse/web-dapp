class API::QuestExperiencePointBlueprint < Blueprinter::Base
  view :normal do
    fields :amount, :rule
  end
end
