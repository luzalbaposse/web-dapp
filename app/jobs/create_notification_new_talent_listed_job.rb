class CreateNotificationNewTalentListedJob < ApplicationJob
  queue_as :default

  def perform(source_id)
    ActiveRecord::Base.transaction do
      service = CreateNotification.new
      User.find_each do |user|
        next if source_id == user.id

        service.call(
          body: 'New talent listed',
          user_id: user.id,
          type: 'Notifications::TalentListed'
        )
      end
    rescue => e
      Rollbar.error(e, "Unable to create notification for new talent listed")

      raise ActiveRecord::Rollback.new(e)
    end
  end
end