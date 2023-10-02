class UserMailer < ApplicationMailer
  def send_sign_up_email
    user = User.find(indifferent_access_params[:user_id])

    dynamic_template_data = {
      confirm_email: confirm_email_url(token: user.email_confirmation_token),
      first_name: sendgrid_name_variable(user)
    }

    template_id = "d-0e31e2fe5a76467e8973cf16484bf15a"
    to = user.email

    send_sendgrid_email(dynamic_template_data:, template_id:, to:)
  end

  def send_password_reset_email
    user = indifferent_access_params[:user]

    dynamic_template_data = {
      first_name: sendgrid_name_variable(user),
      reset_password: url_for(
        action: "reset_password",
        controller: "onboard",
        token: user.confirmation_token,
        user_id: user.uuid
      )
    }

    template_id = "d-e90e5023339d4ad69e74c272c0761000"
    to = user.email

    send_sendgrid_email(dynamic_template_data:, template_id:, to:)
  end

  def send_message_received_email
    notification = indifferent_access_params[:record].to_notification
    notification.record.mark_as_emailed

    sender = User.find(indifferent_access_params[:sender_id])
    user = indifferent_access_params[:recipient]

    return unless user.has_unread_messages?

    dynamic_template_data = {
      DM_sender_username: sender.username,
      first_name: sendgrid_name_variable(user),
      link_message: messages_url(user: sender.username)
    }

    template_id = "d-aad307f9267342a49724a0cd1834de98"
    to = user.email
    send_sendgrid_email(dynamic_template_data:, template_id:, to:)
  end

  def send_verified_profile_email
    user = User.find(indifferent_access_params[:source_id])

    dynamic_template_data = {first_name: sendgrid_name_variable(user)}
    template_id = "d-1cc5d11d6b5b40e2b6437e900c392722"
    to = user.email

    send_sendgrid_email(dynamic_template_data:, template_id:, to:)
  end

  def send_verification_failed_email
    user = User.find(indifferent_access_params[:source_id])

    dynamic_template_data = {first_name: sendgrid_name_variable(user)}
    template_id = "d-4872e699a01d40ffaa04d7d894bb836c"
    to = user.email

    send_sendgrid_email(dynamic_template_data:, template_id:, to:)
  end

  def send_confirm_account_deletion_email
    token = indifferent_access_params[:token]
    user = indifferent_access_params[:user]

    dynamic_template_data = {
      delete_account: delete_account_url(token:, username: user.username),
      first_name: sendgrid_name_variable(user)
    }

    template_id = "d-421a265369d447ff899fcdcb5b5c3de8"
    to = user.email

    send_sendgrid_email(dynamic_template_data:, template_id:, to:)
  end

  def send_goal_deadline_reminder_email
    goal = indifferent_access_params[:goal]
    user = indifferent_access_params[:user]

    dynamic_template_data = {
      edit_goal: user_url(username: user.username, tab: "goals"),
      first_name: sendgrid_name_variable(user),
      goal_title: goal.title,
      tab_updates: user_url(username: user.username, tab: "updates")
    }

    template_id = "d-a74bb51a5dc549eaa8d9a677a67cfe56"
    to = user.email

    send_sendgrid_email(dynamic_template_data:, template_id:, to:)
  end

  def send_goal_due_in_one_month_reminder_email
    goal = indifferent_access_params[:goal]
    user = indifferent_access_params[:user]

    dynamic_template_data = {
      edit_goal: user_url(username: user.username, tab: "goals"),
      first_name: sendgrid_name_variable(user),
      goal_title: goal.title,
      tab_updates: user_url(username: user.username, tab: "updates")
    }

    template_id = "d-d00675dee35c4a8dbcdcb4395d9e803c"
    to = user.email

    send_sendgrid_email(dynamic_template_data:, template_id:, to:)
  end

  def send_career_update_created_email
    career_update = CareerUpdate.find(indifferent_access_params[:career_update_id])
    sender = User.find(indifferent_access_params[:source_id])
    user = indifferent_access_params[:recipient]

    dynamic_template_data = {
      career_update: career_update.text.gsub("\n", "<br>"),
      first_name: sendgrid_name_variable(user),
      link_send_DM: messages_url(user: sender.username),
      update_sender_username: sender.username
    }

    template_id = "d-a031432f14d344f09a1536a4ecdf851f"
    to = user.email

    send_sendgrid_email(dynamic_template_data:, template_id:, to:)
  end

  def send_election_vote_received_email
    election = Election.find(indifferent_access_params[:election_id])
    vote = Vote.find(indifferent_access_params[:vote_id])
    voter = User.find(indifferent_access_params[:source_id])
    user = indifferent_access_params[:recipient]

    dynamic_template_data = {
      first_name: sendgrid_name_variable(user),
      voter_name: voter.name,
      number_votes: vote.amount,
      total_vote_count: election.votes.where(candidate: user).sum(:amount),
      vote_count_url: collective_url(id: election.organization.slug)
    }

    template_id = "d-d8111d50ecd8457191677ca0a5c40d88"
    to = user.email

    send_sendgrid_email(dynamic_template_data:, template_id:, to:)
  end

  def send_legacy_account_reactivation_email
    user = indifferent_access_params[:user]

    dynamic_template_data = {first_name: sendgrid_name_variable(user)}
    template_id = "d-48b22d9e4027411bb16d5a231d28b2c5"
    to = user.email

    send_sendgrid_email(dynamic_template_data:, template_id:, to:)
  end
end
