FactoryBot.define do
  factory :invite do
    code { SecureRandom.hex(8) }
    max_uses { 5 }
    organization { nil }
    partnership { nil }

    association :user

    factory :organization_invite do
      partnership { nil }
      user { nil }

      association :organization, factory: :community
    end

    factory :partnership_invite do
      organization { nil }
      user { nil }

      association :partnership
    end
  end
end
