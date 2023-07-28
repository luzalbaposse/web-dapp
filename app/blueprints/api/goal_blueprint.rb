class API::GoalBlueprint < Blueprinter::Base
  view :normal do
    fields :title, :description, :link, :progress, :due_date, :created_at
    association :goal_images, blueprint: GoalImageBlueprint, view: :normal, name: :images
  end
end
