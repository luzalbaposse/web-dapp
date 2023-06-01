module Milestones
  class Create
    class Error < StandardError; end

    class StartDateAfterEndDateError < Error; end

    def initialize(talent:, current_user:, params:)
      @talent = talent
      @current_user = current_user
      @params = params
    end

    def call
      milestone = Milestone.new(params.except(:images))

      parsed_date = params[:start_date].split("-").map(&:to_i)
      milestone.start_date = Date.new(parsed_date[2], parsed_date[1], parsed_date[0])
      if params[:end_date].length > 0
        parsed_date = params[:end_date].split("-").map(&:to_i)
        milestone.end_date = Date.new(parsed_date[2], parsed_date[1], parsed_date[0])
      end

      validate_milestone_dates!(milestone)

      create_milestone_images(milestone: milestone) if params[:images].length > 0
      milestone.talent = talent

      milestone.save!

      if milestone.in_progress? || milestone.category == "Other" || milestone.start_date > 6.months.ago
        ActivityIngestJob.perform_later("milestone_create", milestone_update_message(milestone), current_user.id)
      end

      refresh_quests

      milestone
    end

    private

    attr_reader :talent, :current_user, :params

    def milestone_update_message(milestone)
      case milestone.category
      when "Other"
        "@origin has just added a new entry to their journey#{add_title(milestone.title)}"
      when "Position"
        "@origin has just added a new position to their journey#{add_title(milestone.title)}"
      when "Education"
        "@origin has just added a new Education to their journey#{add_title(milestone.title)}"
      end
    end

    def add_title(title)
      if title.present? && title.length > 0
        ": \"#{title}\"."
      else
        "."
      end
    end

    def validate_milestone_dates!(milestone)
      return unless milestone.end_date

      raise StartDateAfterEndDateError, "Start date needs to be before the end date" if milestone.start_date > milestone.end_date
    end

    def create_milestone_images(milestone:)
      params[:images].each do |image|
        milestone_image = milestone.milestone_images.build(image: image[:image_data].as_json)
        milestone_image.image_derivatives!
      end
    end

    def refresh_quests
      Quests::RefreshUserQuestsJob.perform_later(talent.user.id)
    end
  end
end
