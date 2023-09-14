class API::GoalBlueprint < Blueprinter::Base
  view :normal do
    fields :title, :description, :link, :progress, :due_date, :created_at, :id, :pin
    association :goal_images, blueprint: GoalImageBlueprint, view: :normal, name: :images

    field :election_status do |goal, options|
      goal.election&.status
    end

    field :election_count do |goal, options|
      if goal&.election&.present? && options[:current_user]
        goal.election.votes.where(candidate: options[:current_user]).count
      end
    end
  end
end
