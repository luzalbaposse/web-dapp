class API::V1::Talent::TokensController < ApplicationController
  after_action :notify_of_change

  def update
    if current_user.nil? || talent.id != current_acting_user.talent.id || cannot_launch_token
      return render json: {error: "You don't have access to perform that action"}, status: :unauthorized
    end

    was_deployed = talent_token.deployed

    if talent_token.update(token_params)
      if talent_token.deployed? && !was_deployed
        talent_token.update!(deployed_at: Time.current)
        talent.update!(public: true, supporters_count: 0, total_supply: Talent.base_supply)
        Users::UpdateProfileType.new.call(user: current_user, new_profile_type: "talent")
        AddRewardToInviterJob.perform_later(talent_token.id)
        AddUsersToMailerliteJob.perform_later(current_user.id)
        WhitelistUserJob.perform_later(user_id: current_user.id, level: "talent_token")
        UpdateTasksJob.perform_later(type: "Tasks::LaunchToken", user_id: current_user.id)
        SendTokenNotificationToDiscordJob.perform_later(talent_token.id)
        UserMailer.with(user: current_user).send_token_launched_email.deliver_later(wait: 5.seconds)
        ActivityIngestJob.perform_later("token_launch", nil, current_user.id)
        # Wait for blockchain transaction to settle
        TalentSupportersRefreshJob.set(wait: 5.minutes).perform_later(talent_token.contract_id)
      end
      CreateNotificationTalentChangedJob.perform_later(talent.user.subscriptions.pluck(:subscriber_id), talent.user_id)

      render json: TalentBlueprint.render(
        talent,
        view: :extended,
        current_user_active_subscribing: current_user_active_subscribing,
        current_user_pending_subscribing: current_user_pending_subscribing,
        tags: current_acting_user.tags.where(hidden: false)
      )
    else
      render json: {error: talent_token.errors.full_messages.join(", ")}, status: :unprocessable_entity
    end
  end

  private

  def notify_of_change
    CreateNotificationTalentChangedJob.perform_later(talent.user.subscriptions.pluck(:subscriber_id), talent.user_id)
  end

  def talent
    @talent ||=
      if talent_id_param
        Talent.find(params[:talent_id])
      else
        Talent.find_by!(public_key: params[:talent_id])
      end
  end

  def talent_token
    @talent_token ||= TalentToken.find(params[:id])
  end

  def token_params
    params.require(:talent_token).permit(
      :ticker,
      :contract_id,
      :deployed,
      :chain_id
    )
  end

  def cannot_launch_token
    !current_user.approved? && !current_user.talent?
  end
end
