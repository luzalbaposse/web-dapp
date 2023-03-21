class Mailerlite::SyncSubscriber
  include Rails.application.routes.url_helpers

  BASE_URL = "https://api.mailerlite.com/api/v2/subscribers"

  def call(user)
    check_request = search_for_email_request(user)
    if check_request.status == 200
      content = JSON.parse(check_request.body)

      if content.length == 0
        add_subscriber(user)
      else
        update_subscriber(user)
      end
    else
      raise "Error syncing with mailerlite. Probably exceeded rate limit"
    end
  end

  private

  def add_subscriber(user)
    Faraday.post(BASE_URL, {email: user.email, fields: fields(user)}.to_json, headers)
  end

  def update_subscriber(user)
    Faraday.put("#{BASE_URL}/#{user.email}", {fields: fields(user)}.to_json, headers)
  end

  def fields(user)
    {
      username: user.username,
      account_type: account_type(user),
      status: status(user),
      ticker: user.talent&.talent_token&.ticker,
      invite_link: invite_link(user)
    }
  end

  def invite_link(user)
    "https://beta.talentprotocol.com" + sign_up_path(code: user.invited&.code)
  end

  def search_for_email_request(user)
    Faraday.get("#{BASE_URL}/search?query=#{user.email}", {}, headers)
  end

  def account_type(user)
    user.talent? ? "Talent" : "Supporter"
  end

  def status(user)
    if user.talent? && user.talent.talent_token&.contract_id&.present?
      if user.talent.public?
        "Token Live Public"
      else
        "Token Live Private"
      end
    elsif !user.talent? && user.tokens_purchased?
      "Active"
    elsif user.wallet_id.present?
      "Connected"
    else
      "Registered"
    end
  end

  def headers
    {"Content-Type": "application/json", "X-MailerLite-ApiKey": token}
  end

  def token
    @token ||= ENV["MAILER_LITE_API_KEY"]
  end
end
