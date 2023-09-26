module GoogleDrive
  module Galxe
    class UploadWalletAddresses
      CAREER_GOAL_SHEET_ID = "1gmkG1VMPrcSj9BfAzXuXJgzNRmo_AUM1SAb6uOwEC3k"
      SUBSCRIPTION_SHEET_ID = "1RdxT-UYAfWlDeS7C7ygSC-MrZHzNzPttolWKhWo2rSs"

      def call
        upload_for_career_goal_sheet
        upload_for_subscription_sheet
      end

      private

      def upload_for_career_goal_sheet
        row = career_goal_worksheet.num_rows

        new_wallet_addresses_for_career_goal_sheet.each do |wallet_address|
          row += 1
          career_goal_worksheet[row, 1] = wallet_address
        end

        career_goal_worksheet.save
      end

      def new_wallet_addresses_for_career_goal_sheet
        existing_wallet_addresses = career_goal_worksheet.rows[1..].flatten.compact
        wallet_addresses_of_users_with_doing_career_goals - existing_wallet_addresses
      end

      def wallet_addresses_of_users_with_doing_career_goals
        User
          .joins(:goals)
          .where(goals: {progress: Goal::DOING})
          .distinct
          .pluck(:wallet_id)
          .compact
      end

      def career_goal_worksheet
        @career_goal_worksheet ||= session.spreadsheet_by_key(CAREER_GOAL_SHEET_ID).worksheets[0]
      end

      def upload_for_subscription_sheet
        row = subscription_worksheet.num_rows

        new_wallet_addresses_for_subscription_sheet.each do |wallet_address|
          row += 1
          subscription_worksheet[row, 1] = wallet_address
        end

        subscription_worksheet.save
      end

      def new_wallet_addresses_for_subscription_sheet
        existing_wallet_addresses = subscription_worksheet.rows[1..].flatten.compact
        wallet_addresses_of_users_with_four_or_more_subscription_requests - existing_wallet_addresses
      end

      def wallet_addresses_of_users_with_four_or_more_subscription_requests
        User
          .where(id: Subscription.select(:subscriber_id).group(:subscriber_id).having("COUNT(*) >= 4"))
          .pluck(:wallet_id)
          .compact
      end

      def subscription_worksheet
        @subscription_worksheet ||= session.spreadsheet_by_key(SUBSCRIPTION_SHEET_ID).worksheets[0]
      end

      def session
        @session ||= GoogleDrive::Session.from_service_account_key(StringIO.new(ENV["GOOGLE_SERVICE_ACCOUNT_JSON"]))
      end
    end
  end
end
