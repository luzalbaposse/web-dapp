FactoryBot.define do
  factory :sponsorship do
    sponsor { SecureRandom.hex }
    talent { SecureRandom.hex }
    token { SecureRandom.hex }
    symbol { "USDC" }
    amount { 20000 }
    chain_id { 137 }
  end
end
