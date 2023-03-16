class PasswordsController < Clearance::PasswordsController
  skip_before_action :ensure_existing_user, only: [:update]
  def create
    if (user = find_user_for_create)
      user.forgot_password!

      UserMailer.with(user: user).send_password_reset_email.deliver_later
    end

    render json: {}, status: :ok
  end

  def update
    @user = User.find_by(uuid: params[:user_id], confirmation_token: params[:token])

    if @user.update_password(password_from_password_reset_params)
      session[:password_reset_token] = nil
      @user.reset_remember_token!

      render json: {id: @user.uuid}, status: :ok
    else
      render json: {error: "There was an error changing the password"}, status: :unauthorized
    end
  end
end
