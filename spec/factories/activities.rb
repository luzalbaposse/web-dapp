FactoryBot.define do
  factory :activity do
    association :origin_user, factory: :user
  end
end
