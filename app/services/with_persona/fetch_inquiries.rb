require "with_persona/client"

module WithPersona
  class FetchInquiries
    def call
      talents = Talent.where(verified: false).where.not(with_persona_id: nil)
      talents.each do |talent|
        request = client.fetch_inquiry(inquiry_id: talent.with_persona_id)
        inquiry = JSON.parse(request.body)
        user = talent.user

        legal_first_name = inquiry["data"]["attributes"]["fields"]["name-first"]["value"]&.downcase || ""
        legal_last_name = inquiry["data"]["attributes"]["fields"]["name-last"]["value"]&.downcase || ""

        if inquiry["data"]["attributes"]["status"] == "completed" &&
            user.legal_first_name && user.legal_last_name &&
            legal_first_name.include?(user.legal_first_name&.downcase) &&
            legal_last_name.include?(user.legal_last_name&.downcase)
          talent.update(verified: true)
          Tasks::Update.new.call(type: "Tasks::Verified", user: user)
        elsif inquiry["data"]["attributes"]["status"] == "completed"
          talent.update(with_persona_id: nil)
        end

        if inquiry["data"]["attributes"]["status"] == "failed" ||
            inquiry["data"]["attributes"]["status"] == "expired"
          talent.update(with_persona_id: nil)
        end
      end
    end

    private

    def client
      @client ||= ::WithPersona::Client.new
    end
  end
end
