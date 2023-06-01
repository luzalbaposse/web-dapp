# Refresh a specific quest for a specific user
module Quests
  class RefreshUserQuest
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
        UserV2Quest.create!(
          user: user,
          v2_quest: quest,
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

        update_profile_completed_at if quest.quest_type == "complete_profile"
        if quest.quest_type == "verify_identity"
          whitelist_user
          credit_invite_points if user.invited
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
      UserV2Quest.where(user: user, v2_quest: quest).any?
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
      else
        false
      end
    end

    def profile_picture_quest_completed?
      user.talent&.profile_picture_data&.present?
    end

    def three_journey_entries_quest_completed?
      journey_count = user.talent&.career_goal&.goals&.count.to_i
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
      user.profile_completed?
    end

    def update_profile_completed_at
      Users::UpdateProfileCompletedAt.new(user: user).call
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
        extra_params: {source_type: "V2Quest", experience_points: quest.experience_points_amount}
      )
    end

    def whitelist_user
      WhitelistUserJob.perform_later(user_id: user.id, level: "verified")
    end

    def credit_invite_points
      ExperiencePoints::CreditInvitePoints.new(invite: user.invited).call
    end
  end
end
