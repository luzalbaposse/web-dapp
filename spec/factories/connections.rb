FactoryBot.define do
  factory :connection do
    connection_type { "follower" }
    connected_at { Time.now }
    connected_user_invested_amount { "0" }
    user_invested_amount { "0" }
    uuid { SecureRandom.uuid }
  end
end
