class API::V1::PublicAPI::GoalsController < API::V1::PublicAPI::APIController
  before_action :internal_only, except: [:index]
  before_action :authenticated_only, except: [:index]

  def index
    goals = user.goals

    pagy, page_goals = pagy_uuid_cursor(
      goals.includes(:goal_images),
      before: cursor,
      items: per_page,
      order: {due_date: :desc}
    )

    active_election = Election.active.exists?

    response_body = {
      goals: API::GoalBlueprint.render_as_json(page_goals, view: :normal, current_user: current_user),
      active_election: active_election,
      pagination: {
        total: goals.count,
        cursor: pagy.has_more? ? page_goals.last.uuid : nil
      }
    }

    log_request(response_body, :ok)

    render json: response_body, status: :ok
  end

  def update
    updated_goal = Goals::Update.new(goal: goal, params: goal_params).call

    response_body = {
      goal: API::GoalBlueprint.render_as_json(updated_goal, view: :normal)
    }
    render json: response_body, status: :ok
  rescue Goals::Update::UpdateError => error
    Rollbar.error(error, "Error updating goal", current_user_id: current_user.id, goal_id: goal.id, goal_params: goal_params.to_h)
    render json: {error: "Unable to update goal."}, status: :bad_request
  end

  def create
    created_goal = Goals::Create.new(
      user: current_user,
      params: goal_params
    ).call

    response_body = {
      goal: API::GoalBlueprint.render_as_json(created_goal, view: :normal)
    }
    render json: response_body, status: :created
  rescue Goals::Create::CreationError => error
    Rollbar.error(error, "Error creating goal", current_user_id: current_user.id, goal_params: goal_params.to_h)
    render json: {error: "Unable to create goal."}, status: :bad_request
  end

  def destroy
    service = Goals::Destroy.new(goal: goal)

    if service.call
      response_body = {
        goal: API::GoalBlueprint.render_as_json(goal, view: :normal)
      }

      render json: response_body, status: :ok
    else
      render json: {error: "Unable to delete requested goal."}, status: :unprocessable_entity
    end
  end

  private

  def user
    @user ||= User.find_by!("wallet_id = :id OR username = :id", id: downcase_id)
  end

  def goal
    @goal ||= current_user.goals.find_by!(uuid: params[:id])
  end

  def goal_params
    params.require(:goal).permit(
      :title,
      :due_date,
      :description,
      :link,
      :progress,
      :election_selected,
      images: [
        :id,
        image_data: {}
      ]
    )
  end
end
