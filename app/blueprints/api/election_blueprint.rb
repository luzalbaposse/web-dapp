class API::ElectionBlueprint < Blueprinter::Base
  view :normal do
    fields :id, :start_date, :voting_start_date, :voting_end_date

    field :status do |election, _options|
      election.status
    end

    field :vote_count do |election, _options|
      election.votes.sum(&:amount)
    end

    field :prize_pool do |election, _options|
      election.votes.sum(&:cost)
    end
  end
end
