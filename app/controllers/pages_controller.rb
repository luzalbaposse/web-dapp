class PagesController < ApplicationController
  def home
    if current_user.present?
      redirect_to talent_index_path
    end

    if params[:invite_code].present?
      @invite = Invite.find_by("code ILIKE ?", params[:invite_code])
      @user = @invite&.user
    end
  end
end
