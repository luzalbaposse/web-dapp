FactoryBot.define do
  factory :user do
    sequence :username do |n|
      "user#{n}"
    end
    sequence :email do |n|
      "user_#{n}@talentprotocol.com"
    end
    password { "password" }
    email_confirmed_at { Time.current }
    wallet_id { SecureRandom.hex }
    onboarded_at { Time.current }
    uuid { SecureRandom.uuid }

    association :activity_feed, factory: :activity_feed, strategy: :build

    trait :with_talent do
      association :talent
    end

    trait :with_talent_token do
      association :talent, :with_token
    end

    trait :full_profile do
      association :talent, :full_profile
    end

    trait :with_profile_complete do
      profile_completed_at { Time.current }
    end
  end
end
