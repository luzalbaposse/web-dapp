class UserMailer < ApplicationMailer
  def send_sign_up_email
    @user_id = indifferent_access_params[:user_id]
    @user = User.find(@user_id)

    bootstrap_mail(to: @user.email, subject: "Confirm your email address")
  end

  def send_password_reset_email
    @user = indifferent_access_params[:user]
    bootstrap_mail(to: @user.email, subject: "Talent Protocol - Did you forget your password?")
  end

  def send_invite_email
    @invite = indifferent_access_params[:invite]
    @email = indifferent_access_params[:email]
    bootstrap_mail(to: @email, subject: "Talent Protocol - You're in!")
  end

  def send_welcome_email
    @user = indifferent_access_params[:user]
    bootstrap_mail(to: @user.email, subject: "Welcome to the home of talented builders")
  end

  def send_token_launch_reminder_email
    @user = indifferent_access_params[:user]
    @user.update!(token_launch_reminder_sent_at: Time.now)

    bootstrap_mail(to: @user.email, subject: "No token, no supporters 🤔")
  end

  def send_token_launched_email
    @user = indifferent_access_params[:user]
    bootstrap_mail(to: @user.email, subject: "Congrats, your Talent Token is now live!")
  end

  def send_token_purchase_reminder_email
    @user = indifferent_access_params[:user]
    @user.update!(token_purchase_reminder_sent_at: Time.now)

    bootstrap_mail(to: @user.email, subject: "You're missing out on $TAL rewards!")
  end

  def send_message_received_email
    @user = indifferent_access_params[:recipient]
    @sender = User.find(indifferent_access_params[:sender_id])
    @notification = indifferent_access_params[:record].to_notification
    @notification.record.mark_as_emailed

    set_profile_pictures_attachments([@sender])

    bootstrap_mail(to: @user.email, subject: "You have a new message from #{@sender.username}") if @user.has_unread_messages?
  end

  def send_complete_profile_reminder_email
    @user = indifferent_access_params[:user]
    @user.update!(complete_profile_reminder_sent_at: Time.zone.now)
    bootstrap_mail(to: @user.email, subject: "Complete your profile and earn your NFT today! 🚀")
  end

  def send_verified_profile_email
    @user = User.find(indifferent_access_params[:source_id])
    bootstrap_mail(to: @user.email, subject: "You're verified! ✅")
  end

  def send_verification_failed_email
    @user = User.find(indifferent_access_params[:source_id])
    @reason = indifferent_access_params[:reason]

    bootstrap_mail(to: @user.email, subject: "Verification failed 💔")
  end

  def send_application_received_email
    @user = indifferent_access_params[:recipient]

    bootstrap_mail(to: @user.email, subject: "We've received your application")
  end

  def send_application_rejected_email
    @user = indifferent_access_params[:recipient]
    @note = indifferent_access_params[:note]
    @reviewer = User.find(indifferent_access_params[:source_id])

    bootstrap_mail(to: @user.email, subject: "Your application hasn't been approved")
  end

  def send_application_approved_email
    @user = indifferent_access_params[:recipient]

    bootstrap_mail(to: @user.email, subject: "Hey, you can now launch your token 🚀")
  end

  def send_invite_used_email
    @user = indifferent_access_params[:recipient]
    @invitee = User.find(indifferent_access_params[:source_id])
    @invitee_username = @invitee.username
    @notification = indifferent_access_params[:record].to_notification
    @notification.record.mark_as_emailed

    bootstrap_mail(to: @user.email, subject: "#{@invitee_username} signed up with your invite!")
  end

  def send_confirm_account_deletion_email
    @token = indifferent_access_params[:token]
    @user = indifferent_access_params[:user]

    bootstrap_mail(to: @user.email, subject: "Is this goodbye?")
  end

  def send_goal_deadline_reminder_email
    @goal = indifferent_access_params[:goal]
    @user = indifferent_access_params[:user]

    bootstrap_mail(to: @user.email, subject: "Your goal's deadline is today!")
  end

  def send_goal_due_in_one_month_reminder_email
    @goal = indifferent_access_params[:goal]
    @user = indifferent_access_params[:user]

    bootstrap_mail(to: @user.email, subject: "Your goal's deadline is in one month!")
  end

  def send_goal_15_days_past_due_date_reminder_email
    @goal = indifferent_access_params[:goal]
    @user = indifferent_access_params[:user]

    bootstrap_mail(to: @user.email, subject: "Your goal's deadline was 15 days ago!")
  end

  def send_goal_30_days_past_due_date_reminder_email
    @goal = indifferent_access_params[:goal]
    @user = indifferent_access_params[:user]

    bootstrap_mail(to: @user.email, subject: "Your Goal's Journey: Past Its Due Date, What's Next?")
  end

  def send_opportunities_open_roles_email
    @user = indifferent_access_params[:user]

    bootstrap_mail(to: @user.email, subject: "We have open roles for you!")
  end
end
