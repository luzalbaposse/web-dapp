FactoryBot.define do
  factory :merch_code do
    code { SecureRandom.hex(4) }
    assigned { false }
    association :experience_reward
  end
end
