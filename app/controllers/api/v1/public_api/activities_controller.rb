class API::V1::PublicAPI::ActivitiesController < API::V1::PublicAPI::APIController
  before_action :internal_only
  before_action :authenticated_only

  def index
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

  private

  def activity_params
    params.permit(:organization, :type)
  end

  def organization_param
    @organization_param ||= activity_params[:organization].presence
  end

  def organization_user_ids
    Organization.find_by(slug: organization_param)&.user_ids || []
  end

  def total_activities
    return @total_activities if defined?(@total_activities)

    @total_activities = type_param ? current_user.activity_feed.activities_of_type(type_param) : current_user.activity_feed.all_activities
    @total_activities = @total_activities.joins(:origin_user).where(origin_user: {id: organization_user_ids}) if organization_param

    @total_activities
  end

  def type_param
    @type_param ||= activity_params[:type].presence
  end
end
