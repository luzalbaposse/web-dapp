class EmailConfirmationsController < ApplicationController
  def update
    user = User.find_by!(email_confirmation_token: params[:token])

    user.confirm_email
    user.update(email_confirmation_token: Clearance::Token.new)

    AddUsersToMailerliteJob.perform_later(user.id)
    UserMailer.with(user:).send_welcome_email.deliver_later(wait: 5.seconds)

    sign_in user

    redirect_to root_path, flash: {success: "Account confirmed successfully."}
  end
end
