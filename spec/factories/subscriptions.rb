FactoryBot.define do
  factory :subscription do
    association :user
    association :subscriber, factory: :user
    accepted_at { Time.current }

    trait :pending do
      accepted_at { nil }
    end
  end
end
