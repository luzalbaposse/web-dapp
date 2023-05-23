class API::V1::PublicAPI::InvitedTalentsController < API::V1::PublicAPI::APIController
  before_action :internal_only
  before_action :authenticated_only

  def index
    invites = current_user.invites.common
    invited_users = User.where(invited: invites)

    pagy, users = pagy_uuid_cursor(
      invited_users,
      before: cursor,
      items: per_page,
      order: {created_at: :desc, uuid: :desc}
    )

    response_body = {
      talents: API::TalentBlueprint.render_as_json(users.includes(talent: :talent_token), view: :invites),
      pagination: {
        total: invited_users.count,
        cursor: pagy.has_more? ? users.last.uuid : nil
      }
    }
    log_request(response_body, :ok)

    render json: response_body, status: :ok
  end
end
