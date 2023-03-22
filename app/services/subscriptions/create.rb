module Subscriptions
  class Create
    class Error < StandardError; end

    class AlreadyExistsError < Error; end

    class CreationError < Error; end

    def initialize(subscriber_user:, subscribing_user:)
      @subscriber_user = subscriber_user
      @subscribing_user = subscribing_user
    end

    def call
      subscribe = Subscription.find_or_initialize_by(user: subscribing_user, subscriber: subscriber_user)

      raise AlreadyExistsError.new if subscribe.persisted?

      raise CreationError.new(subscribe.error.full_messages) unless subscribe.save

      update_tasks if more_than_2_subscribers?

      update_subscriber_connection
      update_subscribing_connection

      subscribe
    end

    private

    attr_reader :subscriber_user, :subscribing_user

    def more_than_2_subscribers?
      Subscription.where(subscriber: subscriber_user).count > 2
    end

    def update_tasks
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
  end
end
