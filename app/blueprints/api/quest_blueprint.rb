class API::QuestBlueprint < Blueprinter::Base
  view :normal do
    fields :participation_points_amount, :title, :description, :completed_at

    # Although completed_at is not part of the quests model this works since we're selecting the field in the controller
    field :completed_at do |quest, _options|
      quest.completed_at
    end
  end
end