class InviteUsedNotification < BaseNotification
  deliver_by :email,
    mailer: "UserMailer",
    method: :send_invite_used_email,
    delay: 15.minutes,
    if: :should_deliver_immediate_email?

  def url
    earn_url(tab: "invites")
  end
end
