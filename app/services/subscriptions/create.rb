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
      subscription = Subscription.find_by(user: subscribing_user, subscriber: subscriber_user)

      raise AlreadyExistsError.new if subscription&.persisted?

      subscription = PendingSubscription.new(user: subscribing_user, subscriber: subscriber_user)
      raise CreationError.new(subscription.error.full_messages) unless subscription.save

      CreateNotification.new.call(
        recipient: subscribing_user,
        type: SubscriptionRequestReceivedNotification,
        source_id: subscriber_user.id
      )

      subscription
    end

    private

    attr_reader :subscriber_user, :subscribing_user
  end
end
