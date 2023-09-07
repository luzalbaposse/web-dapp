FactoryBot.define do
  factory :experience_reward do
    title { "$100 TAL" }
    description { "Receive a small amount of TAL" }
    cost { 1 }
    active { true }
    stock { 100 }
    uuid { SecureRandom.uuid }

    factory :experience_rewards_tiny_tal, class: "ExperienceRewards::TinyTal" do
      type { "ExperienceRewards::TinyTal" }
    end

    factory :experience_rewards_small_tal, class: "ExperienceRewards::SmallTal" do
      type { "ExperienceRewards::SmallTal" }
    end

    factory :experience_rewards_medium_tal, class: "ExperienceRewards::MediumTal" do
      type { "ExperienceRewards::MediumTal" }
    end

    factory :experience_rewards_large_tal, class: "ExperienceRewards::LargeTal" do
      type { "ExperienceRewards::LargeTal" }
    end

    factory :experience_rewards_cap, class: "ExperienceRewards::Cap" do
      type { "ExperienceRewards::Cap" }
    end

    factory :experience_rewards_sweater, class: "ExperienceRewards::Sweater" do
      type { "ExperienceRewards::Sweater" }
    end

    factory :experience_rewards_tshirt, class: "ExperienceRewards::Tshirt" do
      type { "ExperienceRewards::Tshirt" }
    end
  end
end
