module Goals
  class Create
    def initialize(career_goal:, current_user:, params:)
      @career_goal = career_goal
      @current_user = current_user
      @params = params
    end

    def call
      ActiveRecord::Base.transaction do
        goal = Goal.new(params.except(:images, :election_selected))

        parsed_date = params[:due_date].split("-").map(&:to_i)
        goal.due_date = Date.new(parsed_date[2], parsed_date[1], parsed_date[0])

        goal.career_goal = career_goal

        create_goal_images(goal: goal) if params[:images].length > 0 && params[:election_selected].nil?

        goal.save!

        add_to_collective(goal) if params[:election_selected]

        refresh_quests
        update_profile_completeness
        send_discord_notification(goal) if goal.accomplished?

        goal
      end
    end

    private

    attr_reader :career_goal, :current_user, :params

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
      ActivityIngestJob.perform_later("goal_create", goal_create_message(goal), current_user.id)
    end

    def refresh_quests
      Quests::RefreshUserQuestsJob.perform_later(career_goal.talent.user.id)
    end

    def update_profile_completeness
      Users::UpdateProfileCompleteness.new(user: career_goal.talent.user).call
    end

    def send_discord_notification(goal)
      Discord::SendAccomplishedGoalNotificationJob.perform_later(goal.id)
    end

    def add_to_collective(goal)
      collective = Organization.find_by(slug: "takeoff-istambul")
      if collective.active_election.present?
        collective.memberships.create!(active: true, user: career_goal.talent.user)
        goal.goal_images.create!(image_data: collective.banner_data)
        goal.update!(election: collective.active_election, pin: true)
      end
    end
  end
end
