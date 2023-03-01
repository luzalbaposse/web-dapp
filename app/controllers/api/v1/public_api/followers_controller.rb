class API::V1::PublicAPI::FollowersController < API::V1::PublicAPI::APIController
  def index
    pagy, followers = pagy_uuid_cursor(
      user.followers,
      before: cursor,
      items: per_page,
      order: {created_at: :desc, uuid: :desc}
    )

    response_body = {
      followers: API::TalentBlueprint.render_as_json(followers, view: :normal),
      pagination: {
        total: user.followers.count,
        cursor: pagy.has_more? ? followers.last.uuid : nil
      }
    }
    log_request(response_body, :ok)

    render json: response_body, status: :ok
  end

  private

  def user
    @user ||= User.find_by!("wallet_id = :id OR username = :id", id: params[:id])
  end
end
