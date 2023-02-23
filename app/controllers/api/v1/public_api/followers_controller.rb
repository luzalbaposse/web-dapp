class API::V1::PublicAPI::FollowersController < API::V1::PublicAPI::APIController
  def index
    response_body = {
      followers: API::TalentBlueprint.render_as_json(user.followers, view: :normal)
    }
    log_request(response_body, :ok)

    render json: response_body, status: :ok
  end

  private

  def user
    @user ||= User.find_by!("wallet_id = :id OR username = :id", id: params[:id])
  end
end
