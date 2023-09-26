require "sendgrid-ruby"

module Sendgrid
  module Contacts
    class Upsert
      class Error < StandardError; end

      class BadResponse < Error; end

      def initialize(additional_list_ids: [], user_ids: [])
        @additional_list_ids = additional_list_ids
        @user_ids = user_ids
      end

      def call
        return unless members.any?

        upsert_contacts!
      end

      private

      attr_reader :additional_list_ids, :user_ids

      def upsert_contacts!
        members.find_in_batches(batch_size: 2500) do |batched_members|
          response = marketing_endpoint.contacts.put(request_body: request_body(batched_members))
          raise_error(response) unless response.status_code == "202"
        end
      end

      def marketing_endpoint
        @marketing_endpoint ||= sendgrid_api.client.marketing
      end

      def sendgrid_api
        SendGrid::API.new(api_key: ENV["SENDGRID_API_KEY"])
      end

      def request_body(users)
        {
          contacts: users.map { |user| contact(user) },
          list_ids: [ENV["SENDGRID_MEMBERS_LIST_ID"]] + Array.wrap(additional_list_ids)
        }
      end

      def members
        @members ||=
          begin
            members = User.members.includes(:career_updates, :invites, :tags, :subscriptions, :goals, :talent, :wallet_activities)
            user_ids.present? ? members.where(id: user_ids) : members
          end
      end

      def contact(user)
        {
          custom_fields: custom_fields(user),
          email: user.email,
          first_name: user.legal_first_name,
          last_name: user.legal_last_name
        }.compact
      end

      def custom_fields(user)
        return unless custom_field_ids

        {}.tap do |fields|
          fields[custom_field_id("Username")] = user.username if custom_field_id("Username")
          fields[custom_field_id("WalletAddress")] = user.wallet_id if custom_field_id("WalletAddress")
          fields[custom_field_id("Joined")] = user.email_confirmed_at if custom_field_id("Joined")
          fields[custom_field_id("Last_login")] = user.last_sign_in_at if custom_field_id("Last_login")
          fields[custom_field_id("Active_goals")] = active_goals(user) if custom_field_id("Active_goals")
          fields[custom_field_id("Total_goals")] = total_goals(user) if custom_field_id("Total_goals")
          fields[custom_field_id("Total_updates")] = user.career_updates.size if custom_field_id("Total_updates")
          fields[custom_field_id("Last_update")] = user.career_updates.order(created_at: :desc).first&.created_at if custom_field_id("Last_update")
          fields[custom_field_id("TAL_balance")] = user.tal_balance?.to_s if custom_field_id("TAL_balance")
          fields[custom_field_id("XP")] = user.experience_points_amount if custom_field_id("XP")
          fields[custom_field_id("Location")] = user.talent&.location if custom_field_id("Location")
          fields[custom_field_id("Tags")] = user.tags.map(&:to_s).join(", ") if custom_field_id("Tags")
          fields[custom_field_id("Subscribers")] = user.active_subscriptions.size if custom_field_id("Subscribers")
          fields[custom_field_id("Subscribing")] = user.active_subscribing.size if custom_field_id("Subscribing")
          fields[custom_field_id("Friends_invited")] = User.where(invite_id: user.invites).size if custom_field_id("Friends_invited")
        end.compact
      end

      def custom_field_id(name)
        custom_field_ids.find { |field| field["name"] == name }&.dig("id")
      end

      def custom_field_ids
        @custom_field_ids ||=
          begin
            response = marketing_endpoint.field_definitions.get
            raise_error(response) unless response.status_code == "200"

            JSON.parse(response.body)["custom_fields"]
          end
      end

      def active_goals(user)
        goals(user)&.where(progress: [Goal::DOING, Goal::PLANNED])&.size.to_i
      end

      def total_goals(user)
        goals(user)&.size.to_i
      end

      def goals(user)
        user.talent&.career_goal&.goals
      end

      def raise_error(response)
        raise BadResponse.new("Bad response: #{response.body}")
      end
    end
  end
end
