module Goals
  class Update
    class Error < StandardError; end

    class UpdateError < Error; end

    def initialize(goal:, params:)
      @goal = goal
      @params = params
    end

    def call
      goal.assign_attributes(params.except(:images))
      parsed_date = params[:due_date].split("-").map(&:to_i)
      goal.due_date = Date.new(parsed_date[2], parsed_date[1], parsed_date[0])

      update_goal_images if params[:images] && params[:images].length > 0

      raise UpdateError unless goal.save

      ActivityIngestJob.perform_later("goal_update", goal_update_message(goal), goal.user_id)
      refresh_quests
      send_discord_notification if goal.saved_change_to_progress? && goal.accomplished?

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

    def send_discord_notification
      Discord::SendAccomplishedGoalNotificationJob.perform_later(goal.id)
    end

    def refresh_quests
      Quests::RefreshUserQuestsJob.perform_later(goal.user_id) if goal.user_id.present?
    end
  end
end
