FactoryBot.define do
  factory :goal do
    sequence :title do |n|
      "Title #{n}"
    end

    due_date { Time.zone.today }
    association :career_goal
  end
end
