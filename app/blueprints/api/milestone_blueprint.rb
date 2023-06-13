class API::MilestoneBlueprint < Blueprinter::Base
  view :normal do
    fields :id, :title
  end
end
