class API::UpdateTalent
  attr_reader :talent, :user, :success

  def initialize(talent, user)
    @talent = talent
    @user = user
    @success = false
  end

  def call(talent_params, user_params, tag_params, career_need_params)
    update_talent(talent_params)
    update_user(user_params)
    update_tags(tag_params[:tags]) if tag_params[:tags]
    update_career_needs(career_need_params[:career_needs]) if career_need_params[:career_needs]

    @success = true
  end

  private

  def talent_user
    @talent_user ||= talent.user
  end

  def update_user(params)
    if params[:profile_type]
      Users::UpdateProfileType.new.call(
        user: talent_user,
        who_dunnit_id: user.id,
        new_profile_type: params[:profile_type],
        note: params[:note]
      )

      if params[:profile_type] == "waiting_for_approval"
        Tasks::Update.new.call(type: "Tasks::ApplyTokenLaunch", user: talent_user)
      end

      if params[:profile_type] == "approved"
        talent.update!(public: true)
      end
    end

    if params.key?(:legal_first_name) && !talent.with_persona_id
      talent_user.update!(legal_first_name: params[:legal_first_name])
    end

    if params.key?(:legal_last_name) && !talent.with_persona_id
      talent_user.update!(legal_last_name: params[:legal_last_name])
    end

    talent_user.update!(params.except(:profile_type, :note, :legal_first_name, :legal_last_name))
  end

  def update_talent(params)
    if talent[:public] != params[:public] && params.key?(:public)
      # Notify mailerlite that profile was set public
      talent[:public] = params[:public] || false

      AddUsersToMailerliteJob.perform_later(talent_user.id)
    end

    if params.key?(:profile_picture_data) && params[:profile_picture_data][:new_upload]
      talent.profile_picture = params[:profile_picture_data].except(:new_upload).as_json
      talent.profile_picture_derivatives! if talent.profile_picture && talent.profile_picture_changed?
    end

    if params[:profile]
      if params[:profile][:headline]
        talent.pronouns = params[:profile][:pronouns]
        talent.occupation = params[:profile][:occupation]
        talent.location = params[:profile][:location]
        talent.headline = params[:profile][:headline]
        talent.video = params[:profile][:video]
        talent.wallet_address = params[:profile][:wallet_address]
        talent.gender = params[:profile][:gender]
        talent.nationality = params[:profile][:nationality]
        talent.ethnicity = params[:profile][:ethnicity]
        talent.based_in = params[:profile][:based_in]
        talent.highlighted_headline_words_index = params[:profile][:highlighted_headline_words_index]

        if params[:profile][:occupation]
          UpdateTasksJob.perform_later(type: "Tasks::FillInAbout", user_id: talent_user.id)
        end
      end

      if params[:profile][:website]
        talent.website = if params[:profile][:website].length > 0 && !params[:profile][:website].include?("http")
          "http://#{params[:profile][:website]}"
        else
          params[:profile][:website]
        end
      end

      if params[:profile][:discord]
        talent.discord = if params[:profile][:discord].length > 0 && !params[:profile][:discord].include?("http")
          "https://#{params[:profile][:discord]}"
        else
          params[:profile][:discord]
        end
      end
      if params[:profile][:linkedin]
        talent.linkedin = if params[:profile][:linkedin].length > 0 && !params[:profile][:linkedin].include?("http")
          "https://#{params[:profile][:linkedin]}"
        else
          params[:profile][:linkedin]
        end
      end

      if params[:profile][:telegram]
        talent.telegram = params[:profile][:telegram]
      end

      if params[:profile][:github]
        talent.github = if params[:profile][:github].length > 0 && !params[:profile][:github].include?("http")
          "https://#{params[:profile][:github]}"
        else
          params[:profile][:github]
        end
      end

      if params[:profile][:twitter]
        talent.twitter = if params[:profile][:twitter].length > 0 && !params[:profile][:twitter].include?("http")
          "https://#{params[:profile][:twitter]}"
        else
          params[:profile][:twitter]
        end
      end
    end

    if params.key?(:open_to_job_offers)
      talent.open_to_job_offers = params[:open_to_job_offers]
    end

    if params.key?(:verified)
      talent.verified = params[:verified]
      Tasks::Update.new.call(type: "Tasks::Verified", user: talent_user) if talent.verified?
    end

    if params.key?(:with_persona_id)
      talent.with_persona_id = params[:with_persona_id]
    end

    if params.key?(:banner_data) && params[:banner_data][:new_upload]
      talent.banner = params[:banner_data].except(:new_upload).as_json
      talent.banner_derivatives! if talent.banner && talent.banner_changed?
    end

    talent.save!
  end

  def update_tags(all_tags)
    talent
      .user
      .user_tags
      .joins(:tag)
      .where(tag: {hidden: false})
      .where.not(tag: {description: all_tags})
      .delete_all

    all_tags.each do |description|
      tag = Tag.find_or_create_by(description: description.downcase)
      user_tag = UserTag.find_or_initialize_by(user: talent_user, tag: tag)

      user_tag.save! unless user_tag.persisted?
    end
  end

  def update_career_needs(career_needs)
    CareerNeeds::Upsert.new(career_goal: talent.career_goal, titles: career_needs).call
  end
end
