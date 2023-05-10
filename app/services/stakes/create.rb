module Stakes
  class Create
    def initialize(amount:, talent_token:, staking_user:)
      @amount = amount
      @talent_token = talent_token
      @staking_user = staking_user
    end

    def call
      if !staking_user.tokens_purchased
        staking_user.update!(tokens_purchased: true)
        AddUsersToMailerliteJob.perform_later(staking_user.id)
        WhitelistUserJob.perform_later(user_id: staking_user.id, level: "token_holder")
        UpdateTasksJob.perform_later(type: "Tasks::BuyTalentToken", user_id: staking_user.id)
      end

      if !staking_own_token?
        CreateNotification.new.call(
          extra_params:,
          recipient: talent_token.talent.user,
          source_id: staking_user.id,
          type: TokenAcquiredNotification
        )
      end

      # Wait for blockchain transaction to settle
      TalentSupportersRefreshJob.set(wait: 5.minutes).perform_later(talent_token.contract_id)
    end

    private

    attr_reader :amount, :talent_token, :staking_user

    def staking_own_token?
      talent_token.talent.user_id == staking_user.id
    end

    def extra_params
      {amount:}.tap { |params| params[:reinvestment] = true if reinvestment? }
    end

    def reinvestment?
      TalentSupporter.where(supporter_wallet_id: staking_user.wallet_id, talent_contract_id: talent_token.contract_id).exists?
    end
  end
end
