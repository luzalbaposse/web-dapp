FactoryBot.define do
  factory :subscription do
    association :user
    association :subscriber, factory: :user
    accepted_at { Time.current }
  end

  factory :pending_subscription do
    association :user
    association :subscriber, factory: :user

    accepted_at { nil }
  end
end
