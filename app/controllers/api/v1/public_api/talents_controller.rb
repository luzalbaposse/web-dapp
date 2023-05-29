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
    supporters = current_user.supporters.select(:id)
    recomended_users = User.profile_quest_completed
      .where.not(id: subscribed_users.select(:subscriber_id))
      .where.not(id: supporters.select(:id))
      .where.not(id: current_user.id)
      .select("setseed(0.#{Date.today.jd}), users.*")
      .order("RANDOM()")

    pagy, page_recomended_users = pagy_uuid_cursor(
      recomended_users,
      before: cursor,
      items: per_page,
      order: {created_at: :desc, uuid: :desc}
    )

    response_body = {
      talents: API::TalentBlueprint.render_as_json(page_recomended_users.includes(:talent), view: :subscriber),
      pagination: {
        total: recomended_users.length,
        cursor: pagy.has_more? ? page_recomended_users.last.uuid : nil
      }
    }

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
