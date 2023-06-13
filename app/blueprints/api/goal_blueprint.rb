class API::GoalBlueprint < Blueprinter::Base
  view :normal do
    fields :id, :title
  end
end
