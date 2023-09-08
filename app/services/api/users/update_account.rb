module API
  module Users
    class UpdateAccount
      class Error < StandardError; end

      class IncorrentPasswordError < Error; end

      def initialize(user)
        @user = user
      end

      def call(user_params:)
        ActiveRecord::Base.transaction do
          update_user(user_params)
        end

        refresh_quests

        true
      end

      private

      attr_reader :user

      def talent
        @talent ||= user.talent
      end

      def update_user(params)
        if params.key?(:legal_first_name) && !talent.with_persona_id
          user.update!(legal_first_name: params[:legal_first_name])
        end

        if params.key?(:legal_last_name) && !talent.with_persona_id
          user.update!(legal_last_name: params[:legal_last_name])
        end

        if params.key?(:new_password) && params[:new_password].length&.positive?
          if user.authenticated?(params[:current_password])
            user.update!(password: params[:new_password])
          else
            raise IncorrentPasswordError, "Password is incorrect"
          end
        end

        user.update!(params.except(:legal_first_name, :legal_last_name, :current_password, :new_password))
      end

      def refresh_quests
        Quests::RefreshUserQuestsJob.perform_later(user.id)
      end
    end
  end
end
