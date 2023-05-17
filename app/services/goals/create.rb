module Goals
  class Create
    def initialize(career_goal:, current_user:, params:)
      @career_goal = career_goal
      @current_user = current_user
      @params = params
    end

    def call
      goal = Goal.new(params.except(:images))

      parsed_date = params[:due_date].split("-").map(&:to_i)
      goal.due_date = Date.new(parsed_date[2], parsed_date[1], parsed_date[0])

      goal.career_goal = career_goal

      create_goal_images(goal: goal) if params[:images].length > 0

      goal.save!

      ActivityIngestJob.perform_later("goal_create", goal_create_message(goal), current_user.id)

      if career_goal.goals.length >= 1
        # TODO - remove after quests cleanup @quests
        UpdateTasksJob.perform_later(type: "Tasks::Goals", user_id: current_user.id)
      end

      refresh_quests

      goal
    end

    private

    attr_reader :career_goal, :current_user, :params

    def goal_create_message(goal)
      if goal.title.present? && goal.title.length > 0
        "@origin has just made progress on their journey by adding a new goal: '#{goal.title}'."
      else
        "@origin has just made progress on their journey by adding a new goal."
      end
    end

    def create_goal_images(goal:)
      params[:images].each do |image|
        goal_image = goal.goal_images.build(image: image[:image_data].as_json)
        goal_image.image_derivatives!
      end
    end

    def refresh_quests
      Quests::RefreshUserQuestsJob.perform_later(career_goal.talent.user.id)
    end
  end
end
