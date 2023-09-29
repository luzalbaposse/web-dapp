class API::V1::TalentController < ApplicationController
  PER_PAGE = 40
  PAGE_NEUTRALIZER = 1

  def index
    talents =
      if filter_params[:keyword].present?
        filter_query = ActiveRecord::Base.sanitize_sql_array(["SIMILARITY(display_name, :keyword) >= 0.3 OR SIMILARITY(username, :keyword) >= 0.3", keyword: filter_params[:keyword]])
        select_query = ActiveRecord::Base.sanitize_sql_array(["users.*, (SIMILARITY(display_name, :keyword) + SIMILARITY(username, :keyword)) as similarity", keyword: filter_params[:keyword]])
        User.where("profile_completeness >= ?", 0.5)
          .where(filter_query)
          .select(select_query)
          .order("similarity DESC")
      else
        User.where("profile_completeness >= ?", 0.5)
      end

    pagy, talents = pagy(talents, items: per_page, no_order: true)
    talents = API::TalentBlueprint.render_as_json(talents.includes(:talent), view: :normal)

    render(
      json: {
        talents: talents,
        pagination: {
          currentPage: pagy.page,
          lastPage: pagy.last,
          total: pagy.count
        }
      },
      status: :ok
    )
  end

  # Public endpoint
  def show
    talent = Talent.joins(:talent_token).find_by(talent_tokens: {contract_id: params[:id]})

    if talent
      render json: TalentBlueprint.render(
        talent,
        view: :normal,
        current_user_active_subscribing: current_user_active_subscribing,
        current_user_pending_subscribing: current_user_pending_subscribing
      ), status: :ok
    else
      render json: {error: "Not found."}, status: :not_found
    end
  end

  def update
    return render json: {error: "You need to be logged in,"}, status: :unauthorized if !current_user

    if !current_user&.admin? && !current_user.moderator? && talent.id != current_acting_user&.talent&.id
      Rollbar.error(
        "You don't have access to perform that action",
        admin: current_user&.admin?,
        moderator: current_user&.moderator?,
        talent_id: talent&.id,
        acting_talent_id: current_acting_user&.talent&.id,
        talent_params: talent_params.to_h,
        user_params: user_params.to_h,
        tag_params: tag_params.to_h
      )
      return render json: {error: "You don't have access to perform that action"}, status: :unauthorized
    end

    service = API::UpdateTalent.new(talent, current_user)
    service.call(talent_params, user_params, tag_params)

    if service.success
      CreateNotificationTalentChangedJob.perform_later(talent.user.subscriptions.pluck(:subscriber_id), talent.user_id)
      render json: TalentBlueprint.render(
        talent,
        view: :extended,
        current_user_active_subscribing: current_user_active_subscribing,
        current_user_pending_subscribing: current_user_pending_subscribing
      ), status: :ok
    else
      render json: {error: "Unable to update Talent."}, status: :unprocessable_entity
    end
  end

  private

  def talent
    @talent ||=
      if talent_id_param
        Talent.joins(:user).find_by!("users.id::text = :id OR users.uuid::text = :id", id: params[:id].to_s)
      else
        Talent.find_by!(public_key: params[:talent_id])
      end
  end

  def token_id_params
    params.require(:tokens)
  end

  def filter_params
    params.permit(:keyword, :status)
  end

  def user_params
    params.require(:user).permit(
      :display_name,
      :username,
      :profile_type,
      :note,
      :ens_domain,
      :legal_first_name,
      :legal_last_name
    )
  end

  def tag_params
    params.permit(tags: [])
  end

  def talent_params
    params.require(:talent).permit(
      :username,
      :display_name,
      :public,
      :open_to_job_offers,
      :verified,
      profile: [
        :pronouns,
        :occupation,
        :location,
        :headline,
        :website,
        :video,
        :wallet_address,
        :email,
        :linkedin,
        :twitter,
        :telegram,
        :lens,
        :mastodon,
        :discord,
        :github,
        :gender,
        :ethnicity,
        :nationality,
        :based_in,
        highlighted_headline_words_index: []
      ],
      profile_picture_data: {},
      banner_data: {}
    )
  end

  def per_page
    (params[:per_page] || PER_PAGE).to_i
  end
end
