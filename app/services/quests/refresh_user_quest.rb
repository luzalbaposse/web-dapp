require "web3_api/api_proxy"
# Refresh a specific quest for a specific user
module Quests
  class RefreshUserQuest
    TALENT_MATE_CONTRACT = "0x41033160a2351358ddc1b97edd0bc6f00cdeca92"

    def initialize(user:, quest:, notify: true)
      @user = user
      @quest = quest
      @notify = notify
    end

    def call
      return if already_credited?

      return unless quest_completed?

      completed_at = Time.current

      ActiveRecord::Base.transaction do
        UserQuest.create!(
          user: user,
          quest: quest,
          completed_at: completed_at,
          credited_experience_points_amount: quest.experience_points_amount
        )
        ExperiencePoints::Create.new(
          user: user,
          amount: quest.experience_points_amount,
          source: quest,
          credited_at: completed_at,
          description: "Completed #{quest.title}"
        ).call

        if quest.quest_type == "verify_identity"
          whitelist_user
          credit_invite_points if user.invited
        end

        if quest.tal_reward&.positive?
          mint_tal_reward
        end

        if notify
          notify_verified_profile if quest.quest_type == "verify_identity"
          create_quest_completed_notification
        end
      end
    end

    private

    attr_reader :user, :quest, :notify

    def already_credited?
      UserQuest.where(user: user, quest: quest).any?
    end

    def quest_completed?
      case quest.quest_type
      when "profile_picture"
        profile_picture_quest_completed?
      when "three_journey_entries"
        three_journey_entries_quest_completed?
      when "send_career_update"
        send_career_update_completed?
      when "three_talent_subscribe"
        three_talent_subscribe_quest_completed?
      when "verify_identity"
        verify_identity_quest_completed?
      when "supporting_three"
        supporting_three_quest_completed?
      when "five_subscribers"
        five_subscriptions_quest_completed?
      when "connect_wallet"
        connect_wallet_quest_completed?
      when "complete_profile"
        profile_complete_quest_completed?
      when "verify_humanity"
        verify_humanity_quest_completed?
      when "create_talent_mate"
        create_talent_mate_quest_completed?
      when "three_token_holders"
        three_token_holders_quest_completed?
      when "sponsor_talent"
        sponsor_talent_quest_completed?
      when "invite_three"
        invite_three_quest_completed?
      when "active_goal"
        active_goal_quest_completed?
      when "galxe_verification"
        galxe_verification_quest_completed?
      else
        false
      end
    end

    def profile_picture_quest_completed?
      user.talent&.profile_picture_data&.present?
    end

    def three_journey_entries_quest_completed?
      journey_count = user.goals.count.to_i
      journey_count += user.talent&.milestones&.count.to_i

      journey_count >= 3
    end

    def send_career_update_completed?
      user.career_updates.any?
    end

    def three_talent_subscribe_quest_completed?
      user.active_subscribing.count >= 3
    end

    def verify_identity_quest_completed?
      user.talent&.verified?
    end

    def supporting_three_quest_completed?
      user.portfolio.count >= 3 && user.usd_amount_invested >= 10
    end

    def five_subscriptions_quest_completed?
      user.active_subscriptions.count >= 5
    end

    def connect_wallet_quest_completed?
      user.wallet_id.present?
    end

    def profile_complete_quest_completed?
      user.profile_complete_quest_completed?
    end

    def verify_humanity_quest_completed?
      user.humanity_verified_at.present?
    end

    def create_talent_mate_quest_completed?
      return false unless user.wallet_id && user.talent&.verified

      polygon_client.call(talent_mate_contract, "balanceOf", user.wallet_id) > 0
    end

    def three_token_holders_quest_completed?
      return false unless user.talent.talent_token&.contract_id

      TalentSupporter.where(talent_contract_id: user.talent.talent_token.contract_id).count >= 3
    end

    def sponsor_talent_quest_completed?
      return false unless user.wallet_id

      Sponsorship.invested_by_user(user) >= 5
    end

    def invite_three_quest_completed?
      User
        .joins(:talent)
        .where(invite_id: user.invites.pluck(:id))
        .where("users.created_at > ?", DateTime.new(2023, 6, 1))
        .where(talent: {verified: true})
        .count >= 3
    end

    def active_goal_quest_completed?
      user.goals.active.any?
    end

    def galxe_verification_quest_completed?
      user.user_web3_info&.galxe_passport_token_id.present?
    end

    def notify_verified_profile
      CreateNotification.new.call(
        recipient: user,
        type: VerifiedProfileNotification,
        source_id: user.id
      )
    end

    def create_quest_completed_notification
      CreateNotification.new.call(
        recipient: user,
        type: QuestCompletedNotification,
        source_id: quest.id,
        extra_params: {source_type: "Quest", experience_points: quest.experience_points_amount, tal_reward: quest.tal_reward}
      )
    end

    def whitelist_user
      WhitelistUserJob.perform_later(user_id: user.id, level: "verified")
    end

    def credit_invite_points
      ExperiencePoints::CreditInvitePoints.new(invite: user.invited).call
    end

    def mint_tal_reward
      chain_id = (ENV["CONTRACTS_ENV"] == "production") ? 137 : 44787
      service = Web3::MintVirtualTal.new(chain_id: chain_id)

      service.call(amount: 10, to: user.wallet_id, reason: "in_app_rewards")
    end

    def talent_mate_abi
      @talent_mate_abi ||= JSON.parse(File.read("lib/abi/TalentNFT.json"))
    end

    def talent_mate_contract
      @talent_mate_contract ||= Eth::Contract.from_abi(
        name: "TalentNFT",
        address: TALENT_MATE_CONTRACT,
        abi: talent_mate_abi["abi"]
      )
    end

    def polygon_client
      @polygon_client ||= Eth::Client.create "https://polygon-rpc.com"
    end
  end
end
