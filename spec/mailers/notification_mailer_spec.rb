require "rails_helper"

RSpec.describe NotificationMailer, type: :mailer do
  let(:user) { create :user }

  describe "#digest" do
    let(:notification) { create :notification, type: "UserNamesVerificationFailedNotification", recipient: user }
    let(:mail) { described_class.digest(user.id, [notification.id]) }

    it "renders the header" do
      expect(mail.subject).to eql("Talent Protocol - Here's what you missed")
      expect(mail.to).to eql([user.email])
    end
  end
end
