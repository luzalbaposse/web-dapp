class PagesController < ApplicationController
  def home
    if current_user.present?
      return redirect_to user_path(username: params[:invite_code]) if user
      return redirect_to talent_index_path
    end

    if params[:invite_code].present?
      @invite = Invite.find_by("code ILIKE ?", params[:invite_code])
      @user = @invite&.user
    end
  end

  private

  def user
    @user ||= User.find_by("username=:invite_code or wallet_id=:invite_code or ens_domain=:invite_code", invite_code: params[:invite_code])
  end
end
