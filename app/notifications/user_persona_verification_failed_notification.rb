class UserPersonaVerificationFailedNotification < BaseNotification
  deliver_by :email,
    mailer: "UserMailer",
    method: :send_verification_failed_email,
    delay: 15.minutes,
    if: :should_deliver_immediate_email?

  def url
    user_url(source.username) if source.present?
  end
end
