# Preview all emails at http://localhost:3000/rails/mailers/sponsorship_mailer
class SponsorshipMailerPreview < ActionMailer::Preview
  def new_sponsor_email
    SponsorshipMailer.with(recipient: User.first, source_id: User.second.id).new_sponsor_email
  end

  def sponsorship_claimed_email
    SponsorshipMailer.with(recipient: User.first, source_id: User.second.id).sponsorship_claimed_email
  end
end
