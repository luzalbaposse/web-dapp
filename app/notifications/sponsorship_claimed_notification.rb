class SponsorshipClaimedNotification < BaseNotification
  deliver_by :email,
    mailer: "SponsorshipMailer",
    method: :sponsorship_claimed_email,
    delay: 15.minutes,
    if: :should_deliver_immediate_email?

  def actions
    [
      {
        hierarchy: "primary",
        label: t(".button"),
        request_type: "GET",
        url: messages_url(user: source&.username)
      }
    ]
  end

  def url
    connection_url(tab: "sponsorships")
  end
end
