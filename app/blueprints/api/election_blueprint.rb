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
      cost = 0
      Election.last.votes.each { |v| cost += v.cost.to_f }
      cost / TalentToken::TAL_DECIMALS
    end
  end
end
