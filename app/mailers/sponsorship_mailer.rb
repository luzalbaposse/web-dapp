class SponsorshipMailer < ApplicationMailer
  def new_sponsor_email
    sponsor = User.find(indifferent_access_params[:source_id])
    user = indifferent_access_params[:recipient]

    dynamic_template_data = {
      first_name: sendgrid_name_variable(user),
      sponsor_request_username: sponsor.username
    }

    template_id = "d-5b54752273534b819f73ffdf79b172e1"
    to = user.email

    send_sendgrid_email(dynamic_template_data:, template_id:, to:)
  end
end
