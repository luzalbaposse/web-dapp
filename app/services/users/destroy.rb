module Users
  class Destroy
    def initialize(user:)
      @user = user
    end

    def call
      if user.talent? && user.talent.talent_token&.contract_id&.present?
        return false
      end

      ActiveRecord::Base.transaction do
        if user.invites.count > 0
          user.invites.update_all(user_id: 1, max_uses: 0)
        end

        destroy_talent_relations!

        Transfer.where(user: user).update_all(user_id: nil)
        Message.where(sender_id: user.id).destroy_all
        Message.where(receiver_id: user.id).destroy_all
        Chat.where(sender_id: user.id).destroy_all
        Chat.where(receiver_id: user.id).destroy_all
        UserQuest.where(user: user).destroy_all
        ExperiencePoint.where(user: user).destroy_all
        UserTag.where(user: user).destroy_all
        UserProfileTypeChange.where(user: user).destroy_all
        ProfilePageVisitor.where(user: user).destroy_all
        Impersonation.where(impersonated: user).destroy_all
        Connection.where(user_id: user.id).destroy_all
        Connection.where(connected_user_id: user.id).destroy_all
        UserProductAnnouncement.where(user_id: user.id).destroy_all
        Subscription.where(user: user).destroy_all
        Subscription.where(subscriber: user).destroy_all
        Reward.where(user: user).destroy_all
        Membership.where(user: user).destroy_all
        CareerUpdate.where(user: user).destroy_all
        Vote.where(voter: user).update_all(voter_id: nil)

        user
          .destroy!
          .tap { Sendgrid::DeleteContactJob.perform_later(user.email) }
      end
    end

    private

    attr_reader :user

    def destroy_talent_relations!
      if user.talent?
        user.talent.talent_token.destroy!

        if user.goals.exists?
          user.goals.destroy_all
        end

        if user.talent.career_goal.career_needs.exists?
          user.talent.career_goal.career_needs.destroy_all
        end

        user.talent.career_goal.destroy!

        if user.talent.perks.exists?
          user.talent.perks.destroy_all
        end

        if user.talent.milestones.exists?
          user.talent.milestones.destroy_all
        end

        user.talent.destroy!
      end
    end
  end
end
