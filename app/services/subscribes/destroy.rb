module Subscribes
  class Destroy
    class Error < StandardError; end

    class DestroyError < Error; end

    def initialize(subscribe:)
      @subscribe = subscribe
      @subscriber = subscribe.subscriber
      @subscribing_user = subscribe.user
    end

    def call
      raise DestroyError.new(subscribe.error.full_messages) unless subscribe.destroy

      update_subscriber_connection
      update_subscribing_connection
    end

    private

    attr_reader :subscribe, :subscriber, :subscribing_user

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
