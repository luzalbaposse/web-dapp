module Goals
  class Update
    def initialize(goal:, params:)
      @goal = goal
      @params = params
    end

    def call
      goal.assign_attributes(params.except(:images))
      parsed_date = params[:due_date].split("-").map(&:to_i)
      goal.due_date = Date.new(parsed_date[2], parsed_date[1], parsed_date[0])

      update_goal_images

      goal.save!

      ActivityIngestJob.perform_later("goal_update", goal_update_message(goal), goal.career_goal.talent.user_id)

      goal
    end

    private

    attr_reader :goal, :params

    def goal_update_message(goal)
      if goal.title.present? && goal.title.length > 0
        "@origin updated the goal \"#{goal.title}\" to \"#{goal.progress}\"."
      else
        "@origin updated their goals."
      end
    end

    def update_goal_images
      existing_ids = params[:images].map { |img| img[:id] }.compact
      GoalImage.where(goal: goal).where.not(id: existing_ids).destroy_all

      if params[:images].count > 0
        params[:images].filter { |img| !img[:id] }.each do |image|
          next unless image.key?(:image_data)

          goal_image = goal.goal_images.create!(image: image[:image_data].as_json)
          goal_image.image_derivatives!
        end
      end
    end
  end
end
