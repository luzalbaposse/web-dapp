class API::QuestBlueprint < Blueprinter::Base
  view :normal do
    fields :experience_points_amount, :title, :description, :completed_at, :quest_type

    # Although completed_at is not part of the quests model this works since we're selecting the field in the controller
    field :completed_at do |quest, _options|
      quest.respond_to?(:completed_at) ? quest.completed_at : nil
    end
  end
end
