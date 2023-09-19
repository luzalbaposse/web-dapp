FactoryBot.define do
  factory :org_election, class: "Organizations::Election" do
    description { "The election" }
    name { "Election" }
    type { "Organizations::Election" }
    verified { false }
    website { "https://election.com" }
  end
end
