require "rails_helper"

RSpec.describe SponsorshipMailer, type: :mailer do
  let(:user) { create :user }

  describe "#new_sponsor_email" do
    let(:sender) { create :user }
    let(:mail) { described_class.with(recipient: user, source_id: sender.id).new_sponsor_email }

    it "renders the header" do
      expect(mail.subject).to eql("You have a new sponsor on Talent Protocol")
      expect(mail.to).to eql([user.email])
    end
  end

  describe "#sponsorship_claimed_email" do
    let(:sender) { create :user }
    let(:mail) { described_class.with(recipient: user, source_id: sender.id).sponsorship_claimed_email }

    it "renders the header" do
      expect(mail.subject).to eql("#{sender.username} accepted your sponsorship on Talent Protocol")
      expect(mail.to).to eql([user.email])
    end
  end
end
