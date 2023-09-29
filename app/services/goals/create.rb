module Goals
  class Create
    class Error < StandardError; end

    class CreationError < Error; end

    def initialize(user:, params:)
      @user = user
      @params = params
    end

    def call
      raise CreationError if has_takeoff_goal? && params[:election_selected].present?

      goal = user.goals.new(params.except(:images, :election_selected))

      parsed_date = params[:due_date].split("-").map(&:to_i)
      goal.due_date = Date.new(parsed_date[2], parsed_date[1], parsed_date[0])

      create_goal_images(goal: goal) if params[:images] && params[:images].length > 0 && params[:election_selected].nil?

      ActiveRecord::Base.transaction do
        raise CreationError unless goal.save

        add_to_collective(goal, params[:election_selected]) if params[:election_selected]

        refresh_quests
        update_profile_completeness
        send_discord_notification(goal) if goal.accomplished?

        goal
      end
    end

    private

    attr_reader :user, :params

    def has_takeoff_goal?
      user.goals.where.not(election_id: nil).exists?
    end

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

    def add_to_feed(goal)
      ActivityIngestJob.perform_later("goal_create", goal_create_message(goal), user.id)
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

    def send_takeoff_notification(goal)
      Discord::AppliedToTakeoffNotificationJob.perform_later(goal.id)
    end

    def add_to_collective(goal, collective_selected)
      collective = Organization.find_by(slug: collective_selected)
      if collective.active_election.present?
        collective.memberships.create!(active: true, user: user)
        goal.goal_images.create!(image_data: collective.banner_data)
        goal.update!(election: collective.active_election, pin: true)
      end

      send_takeoff_notification(goal)
    end
  end
end
