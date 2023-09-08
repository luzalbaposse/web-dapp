class TalentBlueprint < Blueprinter::Base
  fields :id, :profile_picture_url

  view :normal do
    fields :occupation, :headline, :user_id, :verified, :supporters_count, :total_supply, :market_cap, :market_cap_variance
    association :talent_token, blueprint: TalentTokenBlueprint, view: :normal
    association :user, blueprint: UserBlueprint, view: :normal

    field :subscribing_status do |talent, options|
      status = "unsubscribed"
      status = "subscribed" if options[:current_user_active_subscribing]&.include?(talent.user_id)
      status = "pending" if options[:current_user_pending_subscribing]&.include?(talent.user_id)
      status
    end

    field :profile_picture_data do |talent, _options|
      talent.profile_picture_data ? JSON.parse(talent.profile_picture_data) : nil
    end

    field :max_supply do
      Talent.max_supply.to_s
    end

    field :supply_progress do |talent, _options|
      (talent.total_supply.to_f / Talent.max_supply) * 100
    end

    field :username do |talent, _options|
      talent.user.username
    end

    field :name do |talent, _options|
      talent.user.name
    end
  end

  view :extended do
    include_view :normal
    fields :banner_url, :profile, :public
    association :user, blueprint: UserBlueprint, view: :extended
    association :tags, blueprint: TagBlueprint do |talent, options|
      options[:tags] || talent.user.tags
    end
    field :connections_count do |talent, _options|
      talent.user.connections.count
    end
    field :subscribers_count do |talent, _options|
      talent.user.subscribers.count
    end
    field :subscribing_count do |talent, _options|
      talent.user.subscribing.count
    end
    field :supporting_count do |talent, _options|
      TalentSupporter.where(supporter_wallet_id: talent.user.wallet_id).count
    end
    field :aggregate_supporters_count do |talent, _options|
      talent.user.aggregate_supporters_count
    end
    field :aggregate_supporting_count do |talent, _options|
      talent.user.aggregate_supporting_count
    end
    field :banner_data do |talent, _options|
      talent.banner_data ? JSON.parse(talent.banner_data) : nil
    end

    association :milestones, blueprint: MilestoneBlueprint, view: :normal
    association :career_goal, blueprint: CareerGoalBlueprint, view: :normal
    association :sponsorships, blueprint: API::SponsorshipBlueprint, view: :normal do |talent, options|
      talent.user.claimed_sponsors
    end
  end

  view :short_meta do
    fields :occupation, :supporters_count, :total_supply, :created_at
    association :talent_token, blueprint: TalentTokenBlueprint, view: :normal, name: :token
    field :username do |talent, options|
      talent.user.username
    end
  end
end
