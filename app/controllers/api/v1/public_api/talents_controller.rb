class API::V1::PublicAPI::TalentsController < API::V1::PublicAPI::APIController
  before_action :internal_only, only: [:following, :overview]
  before_action :authenticated_only, only: [:following, :overview]

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
      talents: API::TalentBlueprint.render_as_json(page_recommended_users.includes(talent: :talent_token), view: :normal),
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

  # ------------ temporary calls for Profile V1.0 ------------
  def overview
    response_body = {
      talent: API::TalentBlueprint.render_as_json(
        user,
        view: :overview,
        current_user_active_subscribing: current_user_active_subscribing,
        current_user_pending_subscribing: current_user_pending_subscribing
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
      talent: API::TalentBlueprint.render_as_json(user, view: :support)
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
end
