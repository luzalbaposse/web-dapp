class API::V1::PublicAPI::ConnectionsController < API::V1::PublicAPI::APIController
  def index
    connections = user.connections

    connections = connections.where("connection_types &&  ?", "{#{connection_type}}") if search_by_connection_type?

    if search_by_keyword?
      connections = connections.joins(:connected_user)
        .where("users.username ILIKE :keyword OR users.display_name ILIKE :keyword", keyword: "%#{search_params[:keyword]}%")
    end

    pagy, page_connections = pagy_uuid_cursor(
      connections,
      before: cursor,
      items: per_page,
      order: {connection_type: :desc, uuid: :desc}
    )

    response_body = {
      connections: API::ConnectionBlueprint.render_as_json(page_connections.includes(connected_user: {talent: :talent_token}), view: :normal),
      pagination: {
        total: connections.count,
        cursor: pagy.has_more? ? page_connections.last.uuid : nil
      }
    }
    log_request(response_body, :ok)

    render(json: response_body, status: :ok)
  end

  private

  def user
    @user ||= User.find_by!("uuid::text = :id OR wallet_id = :id OR username = :id", id: downcase_id)
  end

  def search_params
    params.permit(:keyword, :connection_type)
  end

  def search_by_connection_type?
    search_params[:connection_type].present? && search_params[:connection_type] != "all"
  end

  def search_by_keyword?
    search_params[:keyword].present?
  end

  def connection_type
    if search_params[:connection_type] == "supporters"
      Connection::SUPPORTERS.join(",")
    elsif search_params[:connection_type] == "supporting"
      Connection::SUPPORTING.join(",")
    else
      []
    end
  end
end
