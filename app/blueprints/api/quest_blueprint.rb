class API::QuestBlueprint < Blueprinter::Base
  view :normal do
    fields :experience_points_amount, :title, :description, :quest_type, :sponsored, :new, :tal_reward, :streak

    # Although completed_at is not part of the quests model this works since we're selecting the field in the controller
    field :completed_at do |quest, _options|
      quest.respond_to?(:completed_at) ? quest.completed_at : nil
    end

    association :quest_experience_points,
      blueprint: API::QuestExperiencePointBlueprint,
      name: :experience_points,
      view: :normal
  end
end
