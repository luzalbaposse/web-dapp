require "sendgrid-ruby"

module Sendgrid
  module Contacts
    class Delete
      class Error < StandardError; end

      class BadResponse < Error; end

      def initialize(emails: [])
        @emails = emails
      end

      def call
        delete_contacts!
      end

      private

      attr_reader :emails

      def delete_contacts!
        response = contacts_endpoint.delete(query_params:)
        raise_error(response) unless response.status_code == "202"
      end

      def contacts_endpoint
        @contacts_endpoint ||= sendgrid_api.client.marketing.contacts
      end

      def sendgrid_api
        SendGrid::API.new(api_key: ENV["SENDGRID_API_KEY"])
      end

      def query_params
        return {delete_all_contacts: "true"} if emails.blank?

        {ids: emails.map { |email| contact_id(email) }.compact.join(", ")}
      end

      def contact_id(email)
        contact_ids.dig(email, "contact", "id")
      end

      def contact_ids
        @contact_ids ||=
          begin
            response = contacts_endpoint.search.emails.post(request_body: {emails:})
            raise_error(response) unless response.status_code == "200"

            JSON.parse(response.body)["result"]
          end
      end

      def raise_error(response)
        raise BadResponse.new("Bad response: #{response.body}")
      end
    end
  end
end
