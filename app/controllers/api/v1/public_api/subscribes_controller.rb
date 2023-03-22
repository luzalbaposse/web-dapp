class API::V1::PublicAPI::SubscribesController < API::V1::PublicAPI::APIController
  before_action :internal_only, only: [:create, :destroy]

  def subscribers
    return not_found unless user

    pagy, subscribers = pagy_uuid_cursor(
      user.subscribers,
      before: cursor,
      items: per_page,
      order: {created_at: :desc, uuid: :desc}
    )

    response_body = {
      subscribers: API::TalentBlueprint.render_as_json(subscribers, view: :normal),
      pagination: {
        total: user.subscribers.count,
        cursor: pagy.has_more? ? subscribers.last.uuid : nil
      }
    }
    log_request(response_body, :ok)

    render json: response_body, status: :ok
  end

  def subscribing
    return not_found unless user

    pagy, subscribing = pagy_uuid_cursor(
      user.users_subscribing,
      before: cursor,
      items: per_page,
      order: {created_at: :desc, uuid: :desc}
    )

    response_body = {
      subscribing: API::TalentBlueprint.render_as_json(subscribing, view: :normal),
      pagination: {
        total: user.users_subscribing.count,
        cursor: pagy.has_more? ? subscribing.last.uuid : nil
      }
    }
    log_request(response_body, :ok)

    render json: response_body, status: :ok
  end

  def create
    subscriber_user = user || current_user
    return not_found unless subscriber_user

    Subscribes::Create.new(subscriber_user: subscriber_user, subscribing_user: subscribing_user).call

    render json: {success: "Subscribe successfully created."}, status: :created
  rescue Subscribes::Create::AlreadyExistsError
    render json: {error: "Already subscribing."}, status: :conflict
  rescue Subscribes::Create::CreationError => error
    Rollbar.error(error, "Error creating subscribe", subscriber_user_id: subscriber_user.id, subscribing_user_id: subscribing_user.id)
    render json: {error: "Unable to create subscribe."}, status: :bad_request
  end

  def destroy
    subscriber_user = user || current_user
    return not_found unless subscriber_user

    subscribe = Subscribe.find_by!(user: subscribing_user, subscriber: subscriber_user)

    Subscribes::Destroy.new(subscribe: subscribe).call

    render json: {success: "Subscribe successfully removed."}, status: :ok
  rescue Subscribes::Destroy::DestroyError => error
    Rollbar.error(error, "Error destroying subscribe", subscriber_user_id: subscriber_user.id, subscribing_user_id: subscribing_user.id, subscribe_id: subscribe.id)
    render json: {error: "Unable to remove subscribe."}, status: :bad_request
  end

  private

  def subscribe_params
    params.permit(:talent_id)
  end

  def subscribing_user
    @subscribing_user ||= User.find_by!("uuid::text = :id OR wallet_id = :id OR username = :id", id: subscribe_params[:talent_id])
  end

  def user
    @user ||= User.find_by("uuid::text = :id OR wallet_id = :id OR username = :id", id: params[:id])
  end
end
