module CareerUpdates
  class Create
    def initialize(sender:, message:)
      @sender = sender
      @message = message
    end

    def call
      career_update = create_career_update
      BroadcastCareerUpdateJob.perform_later(career_update_id: career_update.id)
      career_update.reload
    end

    private

    attr_reader :sender, :message

    def create_career_update
      CareerUpdate.create!(
        text: message,
        user: sender
      )
    end
  end
end
