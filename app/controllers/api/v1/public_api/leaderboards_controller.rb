class API::V1::PublicAPI::LeaderboardsController < API::V1::PublicAPI::APIController
  def index
    pagy, leaderboards = pagy_uuid_cursor(
      race.leaderboards,
      before: cursor,
      items: per_page,
      order: {score: :desc, uuid: :desc}
    )

    response_body = {
      leaderboards: API::LeaderboardBlueprint.render_as_json(leaderboards, view: :normal),
      pagination: {
        total: race.leaderboards.count,
        cursor: pagy.has_more? ? leaderboards.last.uuid : nil
      }
    }
    log_request(response_body, :ok)

    render json: response_body, status: :ok
  end

  private

  def race
    @race ||= Race.find_by(uuid: params[:id]) || Race.active_race
  end
end
