class API::V1::Talent::CareerGoalsController < ApplicationController
  after_action :notify_of_change
  before_action :validate_user

  def update
    if talent_params.present?
      talent.profile["video"] = talent_params[:video]
    end

    career_goal.image = career_goal_params[:image_data].as_json
    career_goal.image_derivatives! if career_goal.image && career_goal.image_changed?

    if career_goal.update(career_goal_params.except(:image_url, :image_data)) && talent.save
      render json: CareerGoalBlueprint.render(career_goal, view: :normal), status: :ok
    else
      render json: {error: "Unable to update Career goal"}, status: :unprocessable_entity
    end
  end

  private

  def notify_of_change
    CreateNotificationTalentChangedJob.perform_later(talent.user.subscriptions.pluck(:subscriber_id), talent.user_id)
  end

  def talent
    @talent ||=
      if talent_id_param
        Talent.find(params[:talent_id])
      else
        Talent.find_by!(public_key: params[:talent_id])
      end
  end

  def career_goal
    @career_goal ||= CareerGoal.find(params[:id])
  end

  def career_goal_params
    params.require(:career_goal).permit(
      :bio,
      :pitch,
      :challenges,
      :image_url,
      image_data: {}
    )
  end

  def talent_params
    params.require(:talent).permit(:video)
  end

  def validate_user
    if current_user.nil? || (!current_user.admin? && talent.id != current_acting_user&.talent&.id)
      render json: {error: "You don't have access to perform that action"}, status: :unauthorized
    end
  end
end
