class API::V1::PublicAPI::QuestsController < API::V1::PublicAPI::APIController
  before_action :internal_only, only: [:complete]

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

  def complete
    if quest_params[:quest_type] == "verify_humanity"
      Quests::CompleteVerifyHumanityQuest.new(user: user, params: required_params.to_h).call
    elsif quest_params[:quest_type] == "create_talent_mate"
      Quests::RefreshUserQuest.new(user: user, quest: quest).call
    end

    response_body = {quest: API::QuestBlueprint.render_as_json(quest, view: :normal)}
    log_request(response_body, :ok)

    render json: response_body, status: :ok
  rescue Quests::CompleteVerifyHumanityQuest::VerificationError => error
    response_body = {error: error.message}
    log_request(response_body, :bad_request)
    render json: response_body, status: :bad_request
  end

  private

  def user
    @user ||= User.find_by("uuid::text = :id OR wallet_id = :id OR username = :id", id: downcase_id)
  end

  def quest_params
    params.permit(:quest_type)
  end

  def quest
    @quest ||= Quest.find_by!(quest_type: quest_params[:quest_type])
  end

  def required_params
    params.require(:worldcoin_proof).permit(
      :merkle_root,
      :credential_type,
      :nullifier_hash,
      :proof,
      :chain
    )
  end
end
