class API::ElectionBlueprint < Blueprinter::Base
  view :normal do
    fields :id, :start_date, :voting_start_date, :voting_end_date, :terms_and_conditions_url, :learn_more_url

    field :name do |election, _options|
      election.organization.name
    end

    field :slug do |election, _options|
      election.organization.slug
    end

    field :status do |election, _options|
      election.status
    end

    field :vote_count do |election, _options|
      election.votes.sum(&:amount)
    end

    field :prize_pool do |election, _options|
      cost = 0
      election.votes.each { |v| cost += v.cost.to_f / TalentToken::TAL_DECIMALS }
      cost
    end
  end
end
