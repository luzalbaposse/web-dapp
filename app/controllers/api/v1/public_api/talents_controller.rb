class API::V1::PublicAPI::TalentsController < API::V1::PublicAPI::APIController
  before_action :internal_only, only: [:following, :overview]
  before_action :authenticated_only, only: [
    :following,
    :update_profile,
    :update_about,
    :update_experience,
    :update_account
  ]
  before_action :can_update, only: [:update_profile, :update_about, :update_experience, :update_account]

  def show
    response_body = {
      talent: API::TalentBlueprint.render_as_json(user, view: :detailed)
    }

    log_request(response_body, :ok)

    render json: response_body, status: :ok
  end

  def index
    users = filtered_users

    pagy_params = {
      before: cursor,
      items: per_page
    }
    if collective&.active_election
      pagy_params[:randomize] = true
      pagy_params[:no_order] = true
    else
      pagy_params[:order] = {created_at: :desc, uuid: :desc}
    end

    pagy, page_users = pagy_uuid_cursor(
      users,
      pagy_params
    )

    response_body = {
      talents: API::TalentBlueprint.render_as_json(page_users.includes(:talent), view: index_action_view),
      pagination: {
        total: users.count,
        cursor: pagy.has_more? ? page_users.last.uuid : nil
      }
    }

    log_request(response_body, :ok)

    render json: response_body, status: :ok
  end

  def recommended
    recommended_users = User
      .joins(:tags)
      .joins(
        "LEFT JOIN subscriptions ON subscriptions.subscriber_id = users.id AND
        subscriptions.subscriber_id != users.id"
      )
      .where(tags: {discovery_row: DiscoveryRow.find_by(slug: "top-100-talent")})
      .where.not(id: user.id)
      .distinct

    random_recommended_users = recommended_users.shuffle(random: Random.new(Date.today.jd))

    pagy, page_recommended_users = pagy_uuid_cursor(
      User.in_order_of(:id, random_recommended_users.map(&:id)),
      before: cursor,
      items: per_page,
      no_order: true
    )

    response_body = {
      talents: API::TalentBlueprint.render_as_json(page_recommended_users.includes(talent: :talent_token), view: :with_subscribe_status, current_user_id: current_user&.id),
      pagination: {
        total: recommended_users.length,
        cursor: pagy.has_more? ? page_recommended_users.last.uuid : nil
      }
    }

    render json: response_body, status: :ok
  end

  def following
    users = if downcase_id&.length&.positive?
      current_user.following_user_followers(user.id)
    else
      current_user.following
    end

    pagy, page_users = pagy_uuid_cursor(
      users,
      before: cursor,
      items: per_page,
      order: {created_at: :desc, uuid: :desc}
    )

    response_body = {
      talents: API::TalentBlueprint.render_as_json(page_users.includes(talent: :talent_token), view: :normal),
      pagination: {
        total: users.length,
        cursor: pagy.has_more? ? page_users.last.uuid : nil
      }
    }

    render json: response_body, status: :ok
  end

  def update_profile
    permitted_user_params = user_params.permit(:display_name)
    permitted_talent_params = talent_params.permit(profile: [:location, :headline], profile_picture_data: {})

    API::Users::UpdateProfile.new(user).call(
      user_params: permitted_user_params.to_h,
      talent_params: permitted_talent_params.to_h
    )

    render json: {}, status: :ok
  rescue => e
    Rollbar.error(
      e,
      "Unable to update profile",
      user_id: user.id
    )

    render json: {error: "Unable to update profile"}, status: :unprocessable_entity
  end

  def update_about
    permitted_talent_params = talent_params.permit(
      profile: [:about, :website, :twitter, :linkedin, :figma, :behance, :youtube, :github, :dribbble, :farcaster]
    )

    API::Users::UpdateAbout.new(user).call(
      talent_params: permitted_talent_params.to_h,
      tag_params: tag_params.to_h
    )

    render json: {}, status: :ok
  rescue => e
    Rollbar.error(
      e,
      "Unable to update about section of profile",
      user_id: user.id
    )

    render json: {error: "Unable to update about section of profile"}, status: :unprocessable_entity
  end

  def update_account
    permitted_user_params = user_params.permit(
      :username, :email, :current_password, :new_password, :legal_first_name, :legal_last_name
    )

    API::Users::UpdateAccount.new(user).call(user_params: permitted_user_params.to_h)

    render json: {}, status: :ok
  rescue API::Users::UpdateAccount::IncorrentPasswordError => e
    render json: {error: e.message}, status: :unprocessable_entity
  rescue => e
    Rollbar.error(
      e,
      "Unable to update account",
      user_id: user.id
    )

    render json: {error: "Unable to update account"}, status: :unprocessable_entity
  end

  # ------------ temporary calls for Profile V1.0 ------------
  def overview
    response_body = {
      talent: API::TalentBlueprint.render_as_json(
        user,
        view: :overview,
        current_user_active_subscribing: current_user_active_subscribing,
        current_user_pending_subscribing: current_user_pending_subscribing,
        current_user_id: current_user&.id
      )
    }

    log_request(response_body, :ok)

    render json: response_body, status: :ok
  end

  def about
    response_body = {
      talent: API::TalentBlueprint.render_as_json(user, view: :about)
    }

    log_request(response_body, :ok)

    render json: response_body, status: :ok
  end

  def support
    response_body = {
      talent: API::TalentBlueprint.render_as_json(user, view: :support, current_user_id: current_user&.id)
    }

    log_request(response_body, :ok)

    render json: response_body, status: :ok
  end

  def milestones
    milestones = user.talent.milestones

    pagy, page_milestones = pagy(milestones, items: per_page)

    response_body = {
      milestones: API::MilestoneBlueprint.render_as_json(page_milestones, view: :with_images),
      pagination: {
        total: milestones.count,
        page: pagy.last
      }
    }

    log_request(response_body, :ok)

    render json: response_body, status: :ok
  end

  # ------------ temporary calls for Profile V1.0 ------------

  private

  def user
    @user ||= User.find_by!("wallet_id = :id OR username = :id", id: downcase_id)
  end

  def filtered_users
    Users::Search.new(
      current_user: current_user,
      search_params: filter_params.to_h
    ).call
  end

  def collective
    @collective ||= Organization.find_by(slug: filter_params[:collective_slug])
  end

  def randomized_users(users)
    seed = 10000000000000000.to_f/(DateTime.current.beginning_of_hour).to_i
    users.select("setseed(0.#{seed.to_i}), users.*, random() as random")
  end

  def filter_params
    params.permit(:name, :messaging_disabled, :collective_slug, ids: [])
  end

  def user_params
    return unless params[:user]

    params.require(:user).permit(
      :display_name,
      :username,
      :email,
      :ens_domain,
      :legal_first_name,
      :legal_last_name,
      :current_password,
      :new_password
    )
  end

  def talent_params
    return unless params[:talent]

    params.require(:talent).permit(
      :open_to_job_offers,
      :verified,
      profile: [
        :about,
        :pronouns,
        :occupation,
        :location,
        :headline,
        :website,
        :video,
        :wallet_address,
        :email,
        :linkedin,
        :twitter,
        :telegram,
        :lens,
        :mastodon,
        :discord,
        :github,
        :gender,
        :ethnicity,
        :nationality,
        :based_in,
        :figma,
        :behance,
        :youtube,
        :dribbble,
        :farcaster,
        highlighted_headline_words_index: []
      ],
      profile_picture_data: {},
      banner_data: {}
    )
  end

  def tag_params
    params.permit(tags: [])
  end

  def can_update
    return render json: {error: "You need to be logged in,"}, status: :unauthorized if !current_user

    if !current_user.admin? && !current_user.moderator? && user.id != current_user.id
      Rollbar.error(
        "You don't have access to perform that action",
        admin: current_user&.admin?,
        moderator: current_user&.moderator?,
        talent_id: user.talent&.id,
        acting_talent_id: current_user&.talent&.id,
        talent_params: talent_params&.to_h,
        user_params: user_params&.to_h,
        tag_params: tag_params&.to_h
      )
      render json: {error: "You don't have access to perform that action"}, status: :unauthorized
    end
  end

  def index_action_view
    filter_params.key?(:collective_slug) ? :with_votes : :normal
  end
end
