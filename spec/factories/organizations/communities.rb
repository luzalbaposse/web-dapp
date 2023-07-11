FactoryBot.define do
  factory :community, class: "Organizations::Community" do
    description { "The community" }
    name { "Communtiy" }
    type { "Organizations::Community" }
    verified { false }
    website { "https://community.com" }
  end
end
