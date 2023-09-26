module CareerUpdates
  class Create
    def initialize(sender:, message:, goals:)
      @sender = sender
      @message = message
      @goals = goals
    end

    def call
      # Only allow one update per week
      return if last_career_update_for_user&.created_at&.> Time.current.beginning_of_week
      career_update = create_career_update
      BroadcastCareerUpdateJob.perform_later(career_update_id: career_update.id)
      career_update.reload
    end

    private

    attr_reader :sender, :message, :goals

    def last_career_update_for_user
      CareerUpdate.where(user: sender).last
    end

    def create_career_update
      ActiveRecord::Base.transaction do
        career_update = CareerUpdate.create!(
          text: message,
          user: sender
        )

        goals&.each do |goal|
          goal = Goal.find_by!("uuid::text = ?", goal[:id])
          career_update.goals << goal
        end

        career_update
      end
    end
  end
end
