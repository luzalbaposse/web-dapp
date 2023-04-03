class API::V1::PublicAPI::CareerUpdatesController < API::V1::PublicAPI::APIController
  before_action :internal_only

  def index
    unless allowed_to_see_career_updates?
      return unauthorized_request("Logged in user is not a subscriber of the passed user")
    end

    pagy, career_updates = pagy_uuid_cursor(
      user.career_updates,
      before: cursor,
      items: per_page,
      order: {created_at: :desc, uuid: :desc}
    )

    response_body = {
      career_updates: API::CareerUpdateBlueprint.render_as_json(career_updates, view: :normal),
      pagination: {
        total: user.career_updates.count,
        cursor: pagy.has_more? ? career_updates.last.uuid : nil
      }
    }
    log_request(response_body, :ok)

    render json: response_body, status: :ok
  end

  def create
    sender = User.find_by("wallet_id::text = :id OR username::text = :id", id: user_param_id) if user_param_id
    sender ||= current_user

    return not_found unless sender

    if career_update_params[:message].blank?
      return render json: {
        error: "Unable to create career update, the message is empty."
      }, status: :bad_request
    end

    service = CareerUpdates::Create.new(
      sender: sender,
      message: career_update_params[:message]
    )
    career_update = service.call

    response_body = {
      career_update: API::CareerUpdateBlueprint.render_as_json(career_update, view: :normal)
    }

    log_request(response_body, :created)

    render json: response_body, status: :created
  end

  private

  def user
    @user ||= User.find_by!("wallet_id = :id OR username = :id", id: params[:id])
  end

  def allowed_to_see_career_updates?
    current_user&.admin_or_moderator? || current_user&.id == user.id || current_user&.subscriber_of?(user) || current_user&.amount_invested_in(user)&.positive?
  end

  def career_update_params
    params.require(:career_update).permit(
      :message
    )
  end

  def user_param_id
    params[:talent] ? params[:talent][:id] : nil
  end
end
