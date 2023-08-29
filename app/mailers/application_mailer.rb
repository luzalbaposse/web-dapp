class ApplicationMailer < ActionMailer::Base
  default from: "Talent Protocol <no-reply@talentprotocol.com>"
  layout "bootstrap-mailer"

  private

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
