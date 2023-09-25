FactoryBot.define do
  factory :quest_experience_point do
    amount { 50 }

    association :quest
  end
end
