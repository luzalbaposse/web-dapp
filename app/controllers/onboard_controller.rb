class OnboardController < ApplicationController
  def sign_in
    if profile_subdomain?
      return redirect_to "https://beta.talentprotocol.com/" unless tal_domain

      username = tal_domain.user.username

      redirect_to "https://beta.talentprotocol.com/u/#{username}"
    end
  end

  def sign_up
    if current_user.present?
      return redirect_to user_path(username: params[:invite_code]) if user
      return redirect_to talent_index_path
    end
    if params[:invite_code].present?
      @invite = Invite.find_by("code ILIKE ?", params[:invite_code])
    end
  end

  def onboard
    @user = current_user
  end

  def forgot_password
  end

  def reset_password
  end

  private

  def profile_subdomain?
    request.domain == ENV["TAL_BASE_DOMAIN"]
  end

  def user
    @user ||= User.find_by("username=:invite_code or wallet_id=:invite_code or ens_domain=:invite_code", invite_code: params[:invite_code])
  end
end
