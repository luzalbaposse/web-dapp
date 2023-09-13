class API::V1::PublicAPI::GoalsController < API::V1::PublicAPI::APIController
  def index
    goals = Goal.where(career_goal: user.talent.career_goal)

    pagy, page_goals = pagy_uuid_cursor(
      goals.includes(:goal_images),
      before: cursor,
      items: per_page,
      order: {due_date: :desc}
    )

    active_election = Election.where("start_date > ? and end_date < ?", Date.today, Date.today).exists?

    response_body = {
      goals: API::GoalBlueprint.render_as_json(page_goals, view: :normal),
      active_election: active_election,
      pagination: {
        total: goals.count,
        cursor: pagy.has_more? ? page_goals.last.uuid : nil
      }
    }

    log_request(response_body, :ok)

    render json: response_body, status: :ok
  end

  private

  def user
    @user ||= User.find_by!("wallet_id = :id OR username = :id", id: downcase_id)
  end

  def filter_params
    params.permit(ids: [])
  end
end
