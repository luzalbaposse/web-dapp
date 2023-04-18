class API::SponsorshipBlueprint < Blueprinter::Base
  view :normal do
    fields :amount, :chain_id, :token, :symbol, :claimed_at, :revoked_at

    field :status do |sponsorship, _options|
      sponsorship.status
    end

    field :sponsor_address do |sponsorship, _options|
      sponsorship.sponsor
    end

    field :sponsored_address do |sponsorship, _options|
      sponsorship.talent
    end

    association :sponsor, blueprint: API::TalentBlueprint, view: :normal do |sponsorship, options|
      sponsorship.sponsor_user
    end

    association :sponsored, blueprint: API::TalentBlueprint, view: :normal do |sponsorship, options|
      sponsorship.talent_user
    end
  end
end
