module API
  module Users
    class UpdateAbout
      class Error < StandardError; end

      def initialize(user)
        @user = user
      end

      def call(talent_params: nil, tag_params: nil)
        ActiveRecord::Base.transaction do
          update_talent(talent_params) if talent_params
          update_tags(tag_params[:tags]) if tag_params
        end

        refresh_quests

        true
      end

      private

      attr_reader :user

      def talent
        @talent ||= user.talent
      end

      def update_talent(params)
        if params.key?(:profile_picture_data) && params[:profile_picture_data][:new_upload]
          talent.profile_picture = params[:profile_picture_data].except(:new_upload).as_json
          talent.profile_picture_derivatives! if talent.profile_picture && talent.profile_picture_changed?
        end

        if params[:profile]
          if params[:profile].key?(:about)
            talent.about = params[:profile][:about]
          end

          if params[:profile][:website]
            talent.website = if params[:profile][:website].length > 0 && !params[:profile][:website].include?("http")
              "http://#{params[:profile][:website]}"
            else
              params[:profile][:website]
            end
          end

          if params[:profile][:linkedin]
            talent.linkedin = if params[:profile][:linkedin].length > 0 && !params[:profile][:linkedin].include?("http")
              "https://#{params[:profile][:linkedin]}"
            else
              params[:profile][:linkedin]
            end
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

          if params[:profile][:figma]
            talent.figma = if params[:profile][:figma].length > 0 && !params[:profile][:figma].include?("http")
              "https://#{params[:profile][:figma]}"
            else
              params[:profile][:figma]
            end
          end

          if params[:profile][:behance]
            talent.behance = if params[:profile][:behance].length > 0 && !params[:profile][:behance].include?("http")
              "https://#{params[:profile][:behance]}"
            else
              params[:profile][:behance]
            end
          end

          if params[:profile][:youtube]
            talent.youtube = if params[:profile][:youtube].length > 0 && !params[:profile][:youtube].include?("http")
              "https://#{params[:profile][:youtube]}"
            else
              params[:profile][:youtube]
            end
          end

          if params[:profile][:dribbble]
            talent.dribbble = if params[:profile][:dribbble].length > 0 && !params[:profile][:dribbble].include?("http")
              "https://#{params[:profile][:dribbble]}"
            else
              params[:profile][:dribbble]
            end
          end

          if params[:profile][:farcaster]
            talent.farcaster = if params[:profile][:farcaster].length > 0 && !params[:profile][:farcaster].include?("http")
              "https://#{params[:profile][:farcaster]}"
            else
              params[:profile][:farcaster]
            end
          end
        end

        talent.save!
      end

      def update_tags(all_tags)
        Tags::Upsert.new.call(user: user, tags: all_tags)
      end

      def refresh_quests
        Quests::RefreshUserQuestsJob.perform_later(user.id)
      end
    end
  end
end
