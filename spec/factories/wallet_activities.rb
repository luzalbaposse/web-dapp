FactoryBot.define do
  factory :wallet_activity do
    chain_id { 1 }
    symbol { "TAL" }
    token { SecureRandom.hex }
    tx_date { Time.current }
    tx_hash { SecureRandom.hex }
    wallet { SecureRandom.hex }

    association :user
  end
end
