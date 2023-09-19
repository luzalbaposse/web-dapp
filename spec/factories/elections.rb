FactoryBot.define do
  factory :election do
    start_date { Time.current }
    voting_start_date { Time.current + 1.day }
    voting_end_date { Time.current + 2.days }

    association :organization, factory: :org_election
  end
end
