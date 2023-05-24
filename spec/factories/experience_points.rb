FactoryBot.define do
  factory :experience_point do
    association :user
    description { "Credited points" }
  end
end
