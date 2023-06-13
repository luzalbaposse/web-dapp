class API::V1::PublicAPI::ValidationsController < API::V1::PublicAPI::APIController
  before_action :internal_only

  EMAIL_TAKEN_ERROR_MESSAGE = "Email already taken.".freeze
  EMAIL_INVALID_ERROR_MESSAGE = "Email is not valid.".freeze
  USERNAME_TAKEN_ERROR_MESSAGE = "Username already taken.".freeze
  USERNAME_INVALID_ERROR_MESSAGE = "Username only allows lower case letters and numbers with a maximum of 50 characters.".freeze

  def email
    render json: {error: email_error_message}, status: :ok
  end

  def username
    render json: {error: username_error_message}, status: :ok
  end

  private

  def email_error_message
    message = ""
    message += EMAIL_TAKEN_ERROR_MESSAGE if email_taken?
    message += EMAIL_INVALID_ERROR_MESSAGE unless email_valid?

    message
  end

  def email_taken?
    User.where.not(id: current_user&.id).where(email: params[:email]).any?
  end

  def email_valid?
    User.valid_email?(params[:email])
  end

  def username_error_message
    message = ""
    message += USERNAME_TAKEN_ERROR_MESSAGE if username_taken?
    message += USERNAME_INVALID_ERROR_MESSAGE unless username_valid?

    message
  end

  def username_taken?
    User.where.not(id: current_user&.id).where(username: params[:username]).any?
  end

  def username_valid?
    User.valid_username?(params[:username])
  end
end
