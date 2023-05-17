module Subscriptions
  class Accept
    class Error < StandardError; end

    class AlreadyAcceptedError < Error; end

    class AcceptError < Error; end

    def initialize(subscription:)
      @subscription = subscription
    end

    def call
      raise AlreadyAcceptedError.new unless subscription.pending?

      subscription.accepted_at = Time.current

      raise AcceptError.new(subscription.error.full_messages) unless subscription.save

      Subscriptions::RefreshSubscribeBack.new(subscription: subscription).call

      CreateNotification.new.call(
        recipient: subscriber_user,
        type: SubscriptionAcceptedNotification,
        source_id: subscribing_user.id
      )
      ActivityIngestJob.perform_later("subscribe", nil, subscriber_user.id, subscribing_user.id)

      update_tasks if more_than_2_subscribers?

      refresh_quests

      update_subscriber_connection
      update_subscribing_connection

      subscription
    end

    private

    attr_reader :subscription

    def subscriber_user
      @subscriber_user ||= subscription.subscriber
    end

    def subscribing_user
      @subscribing_user ||= subscription.user
    end

    def more_than_2_subscribers?
      Subscription.where(subscriber: subscriber_user).count > 2
    end

    def update_tasks
      # TODO - remove after quests cleanup @quests
      UpdateTasksJob.perform_later(type: "Tasks::Watchlist", user_id: subscriber_user.id)
    end

    def update_subscriber_connection
      connection ||= Connection.find_or_initialize_by(
        user: subscriber_user,
        connected_user: subscribing_user
      )

      connection.refresh_connection!
    end

    def update_subscribing_connection
      connection ||= Connection.find_or_initialize_by(
        user: subscribing_user,
        connected_user: subscriber_user
      )

      connection.refresh_connection!
    end

    def refresh_quests
      Quests::RefreshUserQuestsJob.perform_later(subscriber_user.id)
      Quests::RefreshUserQuestsJob.perform_later(subscribing_user.id)
    end
  end
end
