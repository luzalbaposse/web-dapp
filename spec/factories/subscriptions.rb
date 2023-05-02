FactoryBot.define do
  factory :subscription do
    uuid { SecureRandom.uuid }
    association :user
    association :subscriber, factory: :user
    accepted_at { Time.current }
  end

  factory :pending_subscription do
    uuid { SecureRandom.uuid }
    association :user
    association :subscriber, factory: :user

    accepted_at { nil }
  end
end
