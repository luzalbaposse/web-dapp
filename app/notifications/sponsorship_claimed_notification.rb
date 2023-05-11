class SponsorshipClaimedNotification < BaseNotification
  deliver_by :email, mailer: "SponsorshipMailer", method: :sponsorship_claimed_email, delay: 15.minutes, if: :should_deliver_immediate_email?

  def button_url
    messages_url(user: source&.id)
  end

  def url
    network_url(tab: "sponsorships")
  end
end
