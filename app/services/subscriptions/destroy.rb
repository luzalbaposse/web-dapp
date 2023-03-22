module Subscriptions
  class Destroy
    class Error < StandardError; end

    class DestroyError < Error; end

    def initialize(subscription:)
      @subscription = subscription
      @subscriber = subscription.subscriber
      @subscribing_user = subscription.user
    end

    def call
      raise DestroyError.new(subscription.error.full_messages) unless subscription.destroy

      update_subscriber_connection
      update_subscribing_connection
    end

    private

    attr_reader :subscription, :subscriber, :subscribing_user

    def update_subscriber_connection
      connection ||= Connection.find_or_initialize_by(
        user: subscriber,
        connected_user: subscribing_user
      )

      connection.refresh_connection!
    end

    def update_subscribing_connection
      connection ||= Connection.find_or_initialize_by(
        user: subscribing_user,
        connected_user: subscriber
      )

      connection.refresh_connection!
    end
  end
end
