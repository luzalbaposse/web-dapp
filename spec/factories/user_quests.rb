FactoryBot.define do
  factory :user_quest do
    completed_at { Time.zone.now }
    credited_experience_points_amount { 50 }
  end
end
