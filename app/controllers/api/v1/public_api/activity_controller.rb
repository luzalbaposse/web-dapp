class API::V1::PublicAPI::ActivityController < API::V1::PublicAPI::APIController
  PER_PAGE = 8

  def index
    activities = current_user.activity_feed.all_activities.order(created_at: :desc)

    pagy, activities = pagy(activities, items: per_page)

    activities_json = API::ActivityBlueprint.render_as_json(activities, view: :normal)
    render json: {
      activities: activities_json,
      pagination: {
        currentPage: pagy.page,
        lastPage: pagy.last
      }
    }, status: :ok
  end

  private

  def per_page
    params[:per_page] || PER_PAGE
  end
end
