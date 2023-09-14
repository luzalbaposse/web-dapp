RSpec.shared_examples "a SendGrid email" do
  it "makes a request to send an email via SendGrid" do
    expect(sendgrid_client)
      .to receive_message_chain(:mail, :_, :post)
      .with(
        request_body: {
          from: sendgrid_from,
          mail_settings: sendgrid_mail_settings,
          personalizations: sendgrid_personalizations,
          template_id:
        }
      )

    mail.deliver_now
  end

  context "when the response status code is not 200" do
    let(:sendgrid_response_status_code) { "400" }

    before do
      allow(Rollbar).to receive(:error)
    end

    it "raises the error to Rollbar" do
      mail.deliver_now

      expect(Rollbar).to have_received(:error).with(
        "Unable to deliver email.",
        anything
      )
    end
  end
end
