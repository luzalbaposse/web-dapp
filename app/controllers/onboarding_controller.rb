class OnboardingController < ApplicationController
  def finish
    current_user.talent.update(
      occupation: params[:occupation],
      experience_level: params[:experienceLevel]
    )

    current_user.talent.profile["nationality"] = params[:nationality]
    current_user.talent.profile["location"] = params[:location]
    current_user.talent.profile["gender"] = params[:gender]
    current_user.talent.profile["headline"] = params[:headline]
    current_user.talent.profile["career_needs"] = params[:career_needs]
    current_user.talent.profile["tags"] = params[:tags]
    current_user.talent.save!

    CareerNeeds::Upsert
      .new(career_goal: current_user.talent.career_goal, titles: params[:careerNeeds])
      .call

    current_user.update!(legal_first_name: params[:legal_first_name], legal_last_name: params[:legal_last_name], onboarded_at: Time.current)

    render json: {success: true}, status: :created
  rescue => e
    Rollbar.error(
      e,
      "Unable to onboard user",
      params
    )
    render json: {error: e.message}, status: :bad_request
  end

  private

  def milestone_params
    params.permit(
      :title,
      :start_date,
      :institution,
      :description,
      :link
    )
  end
end
