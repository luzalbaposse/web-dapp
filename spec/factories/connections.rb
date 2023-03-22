FactoryBot.define do
  factory :connection do
    connection_type { "subscriber" }
    connected_at { Time.now }
    connected_user_invested_amount { "0" }
    user_invested_amount { "0" }
    uuid { SecureRandom.uuid }
  end
end
