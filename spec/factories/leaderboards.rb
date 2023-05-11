FactoryBot.define do
  factory :leaderboard do
    association :user
    association :race
  end
end
