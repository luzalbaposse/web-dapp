FactoryBot.define do
  factory :milestone do
    association :talent
    title { "Title" }
    start_date { Time.now }
  end
end
