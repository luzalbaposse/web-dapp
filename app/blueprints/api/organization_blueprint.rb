class API::OrganizationBlueprint < Blueprinter::Base
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
      end
    end

    association :users, blueprint: API::UserBlueprint, view: :normal
  end
end
