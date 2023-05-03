class API::V1::PublicAPI::ActivityController < API::V1::PublicAPI::APIController
  def index
    activity = Activity.order(created_at: :desc).limit(8)
    response_body = API::ActivityBlueprint.render_as_json(activity, view: :normal)
    render json: response_body, status: :ok
  end
end
