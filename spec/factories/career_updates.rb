FactoryBot.define do
  factory :career_update do
    association :user
    text_ciphertext { CareerUpdate.generate_text_ciphertext("Career update").inspect }
  end
end
