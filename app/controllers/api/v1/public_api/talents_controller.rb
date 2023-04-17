class API::V1::PublicAPI::TalentsController < API::V1::PublicAPI::APIController
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
    subscribed_users = Subscription.where(user_id: current_user.id)
    recomended_users = User.where.not(id: subscribed_users.select(:subscriber_id)).order("RANDOM()").limit(10)
    response_body = API::UserBlueprint.render_as_json(recomended_users, view: :normal)
    render json: response_body, status: :ok
  end

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
