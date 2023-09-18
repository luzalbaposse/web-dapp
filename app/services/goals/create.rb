module Goals
  class Create
    class Error < StandardError; end

    class CreationError < Error; end

    def initialize(user:, params:)
      @user = user
      @params = params
    end

    def call
      goal = user.goals.new(params.except(:images))

      parsed_date = params[:due_date].split("-").map(&:to_i)
      goal.due_date = Date.new(parsed_date[2], parsed_date[1], parsed_date[0])

      create_goal_images(goal: goal) if params[:images] && params[:images].length > 0

      raise CreationError unless goal.save

      ActivityIngestJob.perform_later("goal_create", goal_create_message(goal), user.id)

      refresh_quests
      update_profile_completeness
      send_discord_notification(goal) if goal.accomplished?

      goal
    end

    private

    attr_reader :user, :params

    def goal_create_message(goal)
      if goal.title.present? && goal.title.length > 0
        "@origin added a new goal: '#{goal.title}'."
      else
        "@origin added a new goal."
      end
    end

    def create_goal_images(goal:)
      params[:images].each do |image|
        goal_image = goal.goal_images.build(image: image[:image_data].as_json)
        goal_image.image_derivatives!
      end
    end

    def refresh_quests
      Quests::RefreshUserQuestsJob.perform_later(user.id)
    end

    def update_profile_completeness
      Users::UpdateProfileCompleteness.new(user: user).call
    end

    def send_discord_notification(goal)
      Discord::SendAccomplishedGoalNotificationJob.perform_later(goal.id)
    end
  end
end
