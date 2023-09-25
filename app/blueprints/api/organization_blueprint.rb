class API::OrganizationBlueprint < Blueprinter::Base
  view :simple do
    fields :banner_url,
      :description,
      :logo_url,
      :name,
      :slug,
      :verified

    field :tags do |organization, _options|
      organization.tags.map(&:to_s)
    end

    field :type do |organization, _options|
      case organization.type
      when "Organizations::Community"
        "community"
      when "Organizations::Team"
        "team"
      end
    end

    association :users, blueprint: API::UserBlueprint, view: :simple
  end

  view :normal do
    fields :banner_url,
      :description,
      :discord,
      :github,
      :linkedin,
      :location,
      :logo_url,
      :name,
      :slug,
      :telegram,
      :twitter,
      :verified,
      :website

    field :tags do |organization, _options|
      organization.tags.map(&:to_s)
    end

    field :type do |organization, _options|
      case organization.type
      when "Organizations::Community"
        "community"
      when "Organizations::Team"
        "team"
      when "Organizations::Election"
        "election"
      end
    end

    association :election, blueprint: API::ElectionBlueprint, view: :normal do |organization, _options|
      organization.active_election
    end

    association :users, blueprint: API::UserBlueprint, view: :card, options: {with_vote_count: true}
  end
end
