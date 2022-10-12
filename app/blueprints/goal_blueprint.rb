class GoalBlueprint < Blueprinter::Base
  fields :id

  view :normal do
    fields :due_date, :description
  end
end
