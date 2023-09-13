class ApplicationMailer < ActionMailer::Base
  default from: "Talent Protocol <no-reply@talentprotocol.com>"
  layout "bootstrap-mailer"

  private

  def send_sendgrid_email(dynamic_template_data:, template_id:, to:)
    request_body = sendgrid_request_body(dynamic_template_data:, template_id:, to:)
    response = sendgrid_api.client.mail._("send").post(request_body:)

    if response.status_code != "202"
      Rollbar.error(
        "Unable to deliver email.",
        dynamic_template_data: dynamic_template_data,
        status_code: response.status_code,
        response_body: response.body,
        template_id: template_id,
        to: to
      )
    end
  end

  def sendgrid_api
    @sendgrid_api ||= SendGrid::API.new(api_key: ENV["SENDGRID_API_KEY"])
  end

  def sendgrid_request_body(dynamic_template_data:, template_id:, to:)
    {
      dynamic_template_data:,
      from: {
        email: "no-reply@talentprotocol.com",
        name: ENV["EMAILS_FROM"]
      },
      mail_settings: {sandbox_mode: {enable: !Rails.env.production?}},
      personalizations: [{to: [{email: to}]}],
      template_id:
    }
  end

  def sendgrid_first_name_variable(user)
    user.legal_first_name || user.username
  end

  def indifferent_access_params
    @indifferent_access_params ||= params.with_indifferent_access
  end

  def set_profile_pictures_attachments(users)
    users.each do |user|
      attachments.inline["profile_picture-#{user.id}.png"] = Down.download(user.profile_picture_url).read if user.profile_picture_url.present?
    end
  rescue => e
    Rollbar.error(e, "Error downloading picture of users: ##{users.map(&:id).join(", ")}")
  end

  def set_profile_picture_attachment(user)
    return unless user.profile_picture_url

    attachments.inline["profile_picture-#{user.id}.png"] = Down.download(user.profile_picture_url).read
  rescue => e
    Rollbar.error(e, "Error downloading picture of user_id: ##{user.id}")
  end
end
