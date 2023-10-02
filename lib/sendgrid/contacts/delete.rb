require "sendgrid-ruby"

module Sendgrid
  module Contacts
    class Delete
      class Error < StandardError; end

      class BadResponse < Error; end

      def initialize(emails:)
        @emails = Array.wrap(emails)
      end

      def call
        return unless emails.any?

        delete_contacts!
      end

      private

      attr_reader :emails

      def delete_contacts!
        emails.each_slice(100) do |email_slice|
          contact_ids = fetch_contact_ids(email_slice)
          ids = ids(contact_ids, email_slice)
          next unless ids.present?

          response = contacts_endpoint.delete(query_params: {ids:})
          raise_error(response) unless response.status_code == "202"
        end
      end

      def contacts_endpoint
        @contacts_endpoint ||= sendgrid_api.client.marketing.contacts
      end

      def sendgrid_api
        SendGrid::API.new(api_key: ENV["SENDGRID_API_KEY"])
      end

      def ids(contact_ids, email_slice)
        email_slice
          .map { |email| contact_ids.dig(email, "contact", "id") }
          .compact
          .join(", ")
      end

      def fetch_contact_ids(email_slice)
        response = contacts_endpoint.search.emails.post(request_body: {emails: email_slice})
        raise_error(response) unless response.status_code == "200"

        JSON.parse(response.body)["result"]
      end

      def raise_error(response)
        raise BadResponse.new("Bad response status: #{response.status_code} - body: #{response.body.inspect}")
      end
    end
  end
end
