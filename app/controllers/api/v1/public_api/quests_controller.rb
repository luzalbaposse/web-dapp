class API::V1::PublicAPI::QuestsController < API::V1::PublicAPI::APIController
  def index
    total_quests = Quest.all
    if user
      total_quests = total_quests.joins(
        "
          LEFT JOIN user_quests on user_quests.quest_id = quests.id
          AND user_quests.user_id = #{user.id}
        "
      )
    end

    pagy, quests = pagy_uuid_cursor(
      total_quests,
      before: cursor,
      items: per_page,
      order: {experience_points_amount: :asc, uuid: :desc}
    )

    quests = quests.select("quests.*, user_quests.completed_at") if user

    response_body = {
      quests: API::QuestBlueprint.render_as_json(quests, view: :normal),
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
