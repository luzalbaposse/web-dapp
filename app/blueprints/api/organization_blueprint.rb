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

    field :members_count do |organization, _options|
      organization.users.count
    end

    association :users, blueprint: API::UserBlueprint, view: :simple do |organization, _options|
      organization.users.joins(:talent).where.not(talent: {profile_picture_data: nil}).limit(5)
    end
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
  end

  view :with_election do
    include_view :normal

    association :election, blueprint: API::ElectionBlueprint, view: :normal do |organization, _options|
      organization.active_election
    end

    field :current_user_total_votes do |organization, options|
      election = organization.active_election
      current_user = options[:current_user]

      if current_user && election
        Vote.where(voter: current_user.wallet_id, election: election).sum(&:amount)
      else
        0
      end
    end
  end
end
