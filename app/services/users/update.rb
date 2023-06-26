module Users
  class Update
    def initialize(user:, user_params:, password_params:, tal_domain_params:, wallet_id:, first_quest_popup:)
      @user = user
      @user_params = user_params
      @password_params = password_params
      @tal_domain_params = tal_domain_params
      @wallet_id = wallet_id
      @first_quest_popup = first_quest_popup
    end

    def call
      update_wallet! if wallet_id

      user.update!(first_quest_popup: true) if first_quest_popup

      if tal_domain_params.any?
        if new_tal_domain? && (ens_domain_owner.nil? || ens_domain_owner&.downcase != user.wallet_id)
          return {success: false, errors: {talDomain: "Your wallet does not own the domain specified"}}
        end
        update_tal_domain
      end

      if user_params.any?
        # username should always match the invite code
        if !!user_params[:username] && user_params[:username] != user.username
          invite = Invite.find_by(code: user.username)
          invite&.update(code: user_params[:username])
        end

        if !!user_params[:username] && !User.valid_username?(user_params[:username])
          return {success: false, errors: {username: "Username only allows lower case letters and numbers"}}
        end

        if !!user_params[:email] && !User.valid_email?(user_params[:email])
          return {success: false, errors: {email: "Email is not valid"}}
        end

        user.update!(user_params)

        if !!user_params[:email]
          user.update!(confirmation_token: Clearance::Token.new)
        end
      end

      if password_params[:new_password]&.length&.positive?
        if user.authenticated?(password_params[:current_password])
          user.update!(password: password_params[:new_password])
        else
          return {success: false, errors: {currentPassword: "Passwords don't match"}}
        end
      end

      refresh_quests(user)
      update_profile_completeness(user)

      {success: true, user: user}
    rescue ActiveRecord::RecordNotUnique, ActiveRecord::RecordInvalid => e
      error_message = e.message.downcase

      if error_message.include?("username")
        {success: false, errors: {username: "Username is taken"}}
      elsif error_message.include?("email")
        {success: false, errors: {email: "Email is taken"}}
      elsif error_message.include?("wallet")
        {success: false, errors: "Wallet already exists in the system"}
      end
    end

    private

    attr_reader :user, :user_params, :password_params, :tal_domain_params, :wallet_id, :first_quest_popup

    def update_wallet!
      user.update!(wallet_id: wallet_id&.downcase)

      AddUsersToMailerliteJob.perform_later(user.id)
      Web3::RefreshDomains.new(user: user).call
    end

    def new_tal_domain?
      tal_domain.present? && tal_domain != user.tal_domain&.domain
    end

    def tal_domain
      @tal_domain ||= begin
        domain = tal_domain_params[:tal_domain]
        return domain if tal_domain_params[:tal_domain].include?(ENV["TAL_BASE_DOMAIN"])

        "#{domain}.#{ENV["TAL_BASE_DOMAIN"]}"
      end
    end

    def update_tal_domain
      user_domain = UserDomain.find_or_initialize_by(
        user: user,
        tal_domain: true,
        provider: "ens",
        chain_id: domain_chain_id
      )
      user_domain.update!(domain: tal_domain, wallet: user.wallet_id, theme: tal_domain_params[:tal_domain_theme])
    end

    def refresh_quests(user)
      Quests::RefreshUserQuestsJob.perform_later(user.id)
    end

    def update_profile_completeness(user)
      Users::UpdateProfileCompleteness.new(user: user).call
    end

    def ens_domain_owner
      @ens_domain_owner ||= Web3::EnsDomainOwner.new(domain: tal_domain).call
    end

    def domain_chain_id
      # 1 mainnet
      # 5 goerli
      (ENV["CONTRACTS_ENV"] == "production") ? 1 : 5
    end
  end
end
