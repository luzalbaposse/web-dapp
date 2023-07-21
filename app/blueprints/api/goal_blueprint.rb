class API::GoalBlueprint < Blueprinter::Base
  view :normal do
    fields :id, :title, :description, :link, :progress, :due_date
  end
end
