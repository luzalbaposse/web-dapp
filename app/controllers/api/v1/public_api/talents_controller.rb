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
    users = User.all
    users = users.where("wallet_id IN (:ids) OR username IN (:ids)", ids: filter_params[:ids]) if filter_by_ids?

    pagy, page_users = pagy_uuid_cursor(
      users,
      before: cursor,
      items: per_page,
      order: {created_at: :desc, uuid: :desc}
    )

    response_body = {
      talents: API::TalentBlueprint.render_as_json(page_users.includes(:talent), view: :normal),
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
  end

  def update_account
    permitted_user_params = user_params.permit(
      :username, :email, :current_password, :new_password, :legal_first_name, :legal_last_name
    )

    API::Users::UpdateAccount.new(user).call(user_params: permitted_user_params.to_h)

    render json: {}, status: :ok
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

  def filter_by_ids?
    filter_params[:ids].present? && filter_params[:ids].reject(&:blank?).map(&:downcase).any?
  end

  def filter_params
    params.permit(ids: [])
  end

  def user_params
    params.require(:user).permit(
      :display_name,
      :username,
      :ens_domain,
      :legal_first_name,
      :legal_last_name
    )
  end

  def talent_params
    params.require(:talent).permit(
      :open_to_job_offers,
      :verified,
      profile: [
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
        talent_params: talent_params.to_h,
        user_params: user_params.to_h,
        tag_params: tag_params.to_h
      )
      render json: {error: "You don't have access to perform that action"}, status: :unauthorized
    end
  end
end
