class UsersController < ApplicationController
  def create
    if !verify_captcha
      render json: {error: "We were unable to validate your captcha.", field: "captcha"}, status: :conflict
    elsif !User.valid_username?(user_params[:username])
      render json: {error: "Invalid username.", field: "username"}, status: :conflict
    elsif !User.valid_email?(user_params[:email])
      render json: {error: "Email is not valid.", field: "email"}, status: :conflict
    else
      service = Users::Create.new
      @result = service.call(user_params.to_h)

      if @result[:success]
        UserMailer.with(user_id: @result[:user].id).send_sign_up_email.deliver_later(wait: 5.seconds)

        render json: @result[:user], status: :created
      else
        render json: @result, status: :conflict
      end
    end
  end

  def edit_profile
    if user.id != current_acting_user&.id
      redirect_to root_url
    end

    @talent = user.talent
  end

  def send_confirmation_email
    user = User.find_by!("uuid::text = :id or username = :id", id: params[:user_id])
    user.update(email_confirmation_token: Clearance::Token.new)

    UserMailer.with(user_id: user.id).send_sign_up_email.deliver_later

    render json: {uuid: user.uuid}, status: :ok
  end

  def destroy
    return redirect_to root_url unless user == current_acting_user

    if user.valid_delete_account_token?(params[:token])
      result = Users::Destroy.new(user: user).call
      return redirect_to root_url, flash: {success: "Account deleted"} if result

      redirect_to account_settings_path(username: user.username), flash: {error: "Unable to delete account"}
    else
      redirect_to account_settings_path(username: user.username), flash: {error: "Invalid token"}
    end
  end

  private

  def user
    @user ||= User.find_by!("username=? or wallet_id=? or ens_domain=?", params[:username], params[:username].downcase, params[:username])
  end

  def user_params
    params.permit(:email, :username, :password, :code, :captcha, :mode, :theme_preference, :legal_first_name, :legal_last_name, :gender, :nationality, :location, :headline, career_needs: [], tags: [])
  end

  def verify_captcha
    request = Faraday.post("https://www.google.com/recaptcha/api/siteverify",
      {
        secret: ENV["RECAPTCHA_SECRET_KEY"],
        response: user_params[:captcha]
      },
      {"Content-Type": "application/x-www-form-urlencoded"})

    result = JSON.parse(request.body)
    result["success"]
  end

  def should_see_talent_page?(talent)
    admin?(current_user) || talent_owner?(talent, current_user) || talent.user.public_displayable?
  end

  def admin?(user)
    user&.admin?
  end

  def talent_owner?(talent, user)
    user && user.id == talent&.user_id
  end
end
