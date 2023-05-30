class API::V1::PublicAPI::ActivitiesController < API::V1::PublicAPI::APIController
  before_action :internal_only
  before_action :authenticated_only

  def index
    total_activities = current_user.activity_feed.all_activities

    pagy, activities = pagy_uuid_cursor(
      total_activities,
      before: cursor,
      items: per_page,
      order: {created_at: :desc, uuid: :desc}
    )

    response_body = {
      activities: API::ActivityBlueprint.render_as_json(activities.includes([origin_user: {talent: :talent_token}, target_user: {talent: :talent_token}]), view: :normal),
      pagination: {
        total: total_activities.count,
        cursor: pagy.has_more? ? activities.last.uuid : nil
      }
    }
    log_request(response_body, :ok)

    render json: response_body, status: :ok
  end
end
