FactoryBot.define do
  factory :user_product_announcement do
    association :product_announcement
    association :user
  end
end
