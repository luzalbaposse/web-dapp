class API::GoalBlueprint < Blueprinter::Base
  view :normal do
    fields :title, :description, :link, :progress, :due_date, :created_at

    field :id do |goal, _options|
      goal.uuid
    end

    association :goal_images, blueprint: GoalImageBlueprint, view: :normal, name: :images
  end
end
