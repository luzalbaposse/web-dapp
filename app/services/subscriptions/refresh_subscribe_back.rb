module Subscriptions
  class RefreshSubscribeBack
    def initialize(subscription:)
      @subscription = subscription
    end

    def call
      subscription.update!(subscribed_back_status: subscription_status) if subscription.persisted?
      opposite_subscription.update!(subscribed_back_status: opposite_subscription_status) if opposite_subscription.present?
    end

    private

    attr_reader :subscription

    def subscription_status
      return "no_request" if opposite_subscription.blank?
      return "pending" if opposite_subscription.pending?
      "accepted"
    end

    def opposite_subscription_status
      return "pending" if subscription.pending?
      "accepted"
    end

    def opposite_subscription
      @opposite_subscription ||= Subscription.find_by(user: subscription.subscriber, subscriber: subscription.user)
    end
  end
end
