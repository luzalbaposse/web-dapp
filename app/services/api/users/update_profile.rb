module API
  module Users
    class UpdateProfile
      def initialize(user)
        @user = user
      end

      def call(user_params: nil, talent_params: nil)
        ActiveRecord::Base.transaction do
          update_user(user_params) if user_params
          update_talent(talent_params) if talent_params
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
        user.update!(params.except(:legal_first_name, :legal_last_name, :password))
      end

      def update_talent(params)
        if params.key?(:profile_picture_data) && params[:profile_picture_data][:new_upload]
          talent.profile_picture = params[:profile_picture_data].except(:new_upload).as_json
          talent.profile_picture_derivatives! if talent.profile_picture && talent.profile_picture_changed?
        end

        if params[:profile]
          if params[:profile].key?(:location)
            talent.location = params[:profile][:location]
          end

          if params[:profile].key?(:headline)
            talent.headline = params[:profile][:headline]
          end
        end

        talent.save!
      end

      def refresh_quests
        Quests::RefreshUserQuestsJob.perform_later(user.id)
      end
    end
  end
end
