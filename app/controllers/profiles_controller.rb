class ProfilesController < ApplicationController
  def show
    if user.is_organization && user.discovery_row.present?
      redirect_to collective_path(user.discovery_row.slug)
      return
    end

    # Done this way so we can eager load all the images
    talent =
      Talent
        .includes([career_goal: {goals: :goal_images}, milestones: :milestone_images])
        .find_by!(user: user)

    CreateProfilePageVisitorJob.perform_later(ip: request.remote_ip, user_id: user.id)

    @talent = TalentBlueprint.render_as_json(
      talent,
      view: :extended,
      current_user_active_subscribing: current_user_active_subscribing,
      current_user_pending_subscribing: current_user_pending_subscribing,
      tags: user.tags.where(hidden: false)
    )
    respond_to do |format|
      format.html {}
      format.json { render json: {profile: @talent}, status: :ok }
    end
  end

  private

  def user
    @user ||= begin
      user = User.find_by("username=? or wallet_id=?", params[:username], params[:username].downcase)
      return user if user.present?

      user_domain = UserDomain.find_by!(domain: params[:username], tal_domain: true)
      user_domain.user
    end
  end
end
