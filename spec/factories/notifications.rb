FactoryBot.define do
  factory :notification do
    type { "MessageReceivedNotification" }

    association :recipient, factory: :user
  end
end
