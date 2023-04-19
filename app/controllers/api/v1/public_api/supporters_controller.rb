class API::V1::PublicAPI::SupportersController < API::V1::PublicAPI::APIController
  def index
    supporters = user.supporters.includes(talent: :talent_token)

    pagy, supporters = pagy_uuid_cursor(
      supporters,
      before: cursor,
      items: per_page,
      order: {created_at: :desc, uuid: :desc}
    )

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
    @user ||= User.find_by!("wallet_id = :id OR username = :id", id: downcase_id)
  end
end
