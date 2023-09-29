class API::GoalBlueprint < Blueprinter::Base
  view :normal do
    fields :title, :description, :link, :progress, :due_date, :created_at, :pin

    field :id do |goal, _options|
      goal.uuid
    end

    association :goal_images, blueprint: GoalImageBlueprint, view: :normal, name: :images

    field :election_status do |goal, options|
      goal.election&.status
    end

    field :election_slug do |goal, options|
      goal.election&.organization&.slug
    end

    field :election_count do |goal, options|
      if goal&.election&.present?
        goal.election.votes.where(candidate: goal.user).sum(&:amount)
      end
    end

    field :current_user_votes_count do |goal, options|
      if goal&.election&.present? && options[:current_user]
        goal.election.votes.where(candidate: goal.user, wallet_id: options[:current_user].wallet_id).sum(&:amount)
      end
    end
  end
end
