FactoryBot.define do
  factory :vote do
    association :election
    association :candidate, factory: :user
    association :voter, factory: :user
    amount { 1 }
    cost { 1000 }
  end
end
