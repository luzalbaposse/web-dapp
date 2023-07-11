FactoryBot.define do
  factory :team, class: "Organizations::Team" do
    description { "That team" }
    name { "A team" }
    type { "Organizations::Team" }
    verified { false }
    website { "https://teams.com" }
  end
end
