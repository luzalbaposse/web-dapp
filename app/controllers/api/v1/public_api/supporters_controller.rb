class API::V1::PublicAPI::SupportersController < API::V1::PublicAPI::APIController
  def index
    pagy, supporters = pagy_uuid_cursor(user.supporters, before: cursor, items: per_page)

    response_body = {
      supporters: API::TalentBlueprint.render_as_json(supporters, view: :normal),
      pagination: {
        total: user.supporters.count,
        cursor: pagy.has_more? ? supporters.last.uuid : nil
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
