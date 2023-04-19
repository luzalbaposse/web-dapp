class SponsorshipMailer < ApplicationMailer
  def new_sponsor_email
    @recipient = indifferent_access_params[:recipient]
    @sender = User.find(indifferent_access_params[:source_id])
    set_profile_picture_attachment(@sender)

    bootstrap_mail(to: @recipient.email, subject: "New sponsor request on Talent Protocol awaits you!")
  end

  def sponsorship_claimed_email
    @recipient = indifferent_access_params[:recipient]
    @sender = User.find(indifferent_access_params[:source_id])
    set_profile_picture_attachment(@sender)

    bootstrap_mail(to: @recipient.email, subject: "Your sponsorship was accepted!")
  end
end
