class API::V1::PublicAPI::ExperiencePointsLeaderboardsController < API::V1::PublicAPI::APIController
  def index
    results = leaderboard_results.select("users.*, results.score, results.position")

    talent_result = {
      score: 0,
      position: nil
    }

    if user
      result = results.find_by(id: user.id)

      talent_result = {
        score: result&.score || 0,
        position: result&.position
      }
    end

    response_body = {
      leaderboard: {
        results: API::TalentBlueprint.render_as_json(results.limit(per_page).includes(talent: :talent_token), view: :leaderboard),
        talent_result: talent_result
      }
    }
    log_request(response_body, :ok)

    render json: response_body, status: :ok
  end

  private

  def user
    @user ||= User.find_by("uuid::text = :id OR wallet_id = :id OR username = :id", id: downcase_id)
  end

  def leaderboard_results
    if start_date.present? && end_date.present?
      ExperiencePoint.leaderboard(start_date: Time.parse(start_date), end_date: Time.parse(end_date))
    elsif start_date.present?
      ExperiencePoint.leaderboard(start_date: Time.parse(start_date))
    elsif end_date.present?
      ExperiencePoint.leaderboard(end_date: Time.parse(end_date))
    else
      ExperiencePoint.leaderboard
    end
  end

  def start_date
    params[:start_date]
  end

  def end_date
    params[:end_date]
  end
end
