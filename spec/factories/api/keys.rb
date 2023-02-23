FactoryBot.define do
  factory :api_key, class: API::Key do
    sequence :name do |n|
      "api_key_#{n}"
    end

    trait :activated do
      activated_at { Time.current - 1.day }
    end
  end
end
