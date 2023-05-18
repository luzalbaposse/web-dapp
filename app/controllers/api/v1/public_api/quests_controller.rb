class API::V1::PublicAPI::QuestsController < API::V1::PublicAPI::APIController
  def index
    total_quests = V2Quest.all

    if user
      total_quests = total_quests
        .left_joins(:user_v2_quests)
        .where(user_v2_quests: {user_id: u.id})
    end

    pagy, quests = pagy_uuid_cursor(
      total_quests,
      before: cursor,
      items: per_page,
      order: {participation_points_amount: :asc, uuid: :desc}
    )

    response_body = {
      quests: API::QuestBlueprint.render_as_json(quests.left_joins(:user_v2_quests).select("v2_quests.*, user_v2_quests.completed_at"), view: :normal),
      pagination: {
        total: total_quests.count,
        cursor: pagy.has_more? ? quests.last.uuid : nil
      }
    }
    log_request(response_body, :ok)

    render json: response_body, status: :ok
  end

  private

  def user
    @user ||= User.find_by("uuid::text = :id OR wallet_id = :id OR username = :id", id: downcase_id)
  end
end
