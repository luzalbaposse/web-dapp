class NewSponsorNotification < BaseNotification
  deliver_by :email,
    mailer: "SponsorshipMailer",
    method: :new_sponsor_email,
    delay: 15.minutes,
    if: :should_deliver_immediate_email?

  def url
    connection_url(tab: "sponsors")
  end
end
