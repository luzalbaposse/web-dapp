require "rails_helper"

RSpec.describe UserMailer, type: :mailer do
  let(:user) { create :user }

  describe "sign up email" do
    let(:mail) { described_class.with(user_id: user.id).send_sign_up_email }

    it "renders the header" do
      expect(mail.subject).to eql("Confirm your email address")
      expect(mail.to).to eql([user.email])
    end

    it "assigns email verify url" do
      expect { confirm_email_url(token: user.email_confirmation_token) }.not_to raise_error
    end
  end

  describe "password reset email" do
    let(:mail) { described_class.with(user: user).send_password_reset_email }

    it "renders the header" do
      expect(mail.subject).to eql("Talent Protocol - Did you forget your password?")
      expect(mail.to).to eql([user.email])
    end

    it "assigns reset password url" do
      expect { url_for(controller: "onboard", action: "reset_password", user_id: user.uuid, token: user.confirmation_token) }.not_to raise_error
    end
  end

  describe "welcome email" do
    let(:mail) { described_class.with(user: user).send_welcome_email }

    it "renders the header" do
      expect(mail.subject).to eql("Welcome to the home of talented builders")
      expect(mail.to).to eql([user.email])
    end
  end

  describe "token launch email" do
    let(:mail) { described_class.with(user: user).send_token_launched_email }

    it "renders the header" do
      expect(mail.subject).to eql("Congrats, your Talent Token is now live!")
      expect(mail.to).to eql([user.email])
    end

    it "assigns profile url" do
      expect { user_url(user.username) }.not_to raise_error
    end
  end

  describe "send complete profile reminder email" do
    let(:mail) { described_class.with(user: user).send_complete_profile_reminder_email }

    it "renders the header" do
      expect(mail.subject).to eql("Complete your profile and earn your NFT today! 🚀")
      expect(mail.to).to eql([user.email])
    end
  end

  describe "send application received email" do
    let(:mail) { described_class.with(recipient: user).send_application_received_email }

    it "renders the header" do
      expect(mail.subject).to eql("We've received your application")
      expect(mail.to).to eql([user.email])
    end
  end

  describe "send application rejected email" do
    let(:reviewer) { create :user }
    let(:mail) { described_class.with(recipient: user, source_id: reviewer.id).send_application_rejected_email }

    it "renders the header" do
      expect(mail.subject).to eql("Your application hasn't been approved")
      expect(mail.to).to eql([user.email])
    end
  end

  describe "send application approved email" do
    let(:mail) { described_class.with(recipient: user).send_application_approved_email }

    it "renders the header" do
      expect(mail.subject).to eql("Hey, you can now launch your token 🚀")
      expect(mail.to).to eql([user.email])
    end
  end

  describe "send verified profile email" do
    let(:mail) { described_class.with(source_id: user.id).send_verified_profile_email }

    it "renders the header" do
      expect(mail.subject).to eql("You're verified! ✅")
      expect(mail.to).to eql([user.email])
    end
  end

  describe "send name verification failed profile email" do
    let(:mail) { described_class.with(source_id: user.id, reason: "name").send_verification_failed_email }

    it "renders the header" do
      expect(mail.subject).to eql("Verification failed 💔")
      expect(mail.to).to eql([user.email])
    end
  end

  describe "send persona verification failed profile email" do
    let(:mail) { described_class.with(source_id: user.id, reason: "with_persona").send_verification_failed_email }

    it "renders the header" do
      expect(mail.subject).to eql("Verification failed 💔")
      expect(mail.to).to eql([user.email])
    end
  end

  describe "send message received email" do
    let(:sender) { create :user, username: "alicesmith" }
    let(:notification) { create :notification, type: "MessageReceivedNotification", recipient: user }
    let(:mail) { described_class.with(recipient: user, sender_id: sender.id, record: notification).send_message_received_email }

    before do
      allow(user).to receive(:has_unread_messages?).and_return(true)
    end

    it "renders the header" do
      expect(mail.subject).to eql("You have a new message from alicesmith")
      expect(mail.to).to eql([user.email])
    end
  end

  describe "send invite used email" do
    let(:invitee) { create :user }
    let(:notification) { create :notification, emailed_at: nil, recipient: user }

    let(:mail) do
      described_class
        .with(recipient: user, record: notification, source_id: invitee.id)
        .send_invite_used_email
    end

    it "renders the header" do
      expect(mail.subject).to eql("#{invitee.username} signed up with your invite!")
      expect(mail.to).to eql([user.email])
    end
  end

  describe "send confirm account deletion email" do
    let(:mail) do
      described_class.with(token: "token", user: user).send_confirm_account_deletion_email
    end

    it "renders the header" do
      expect(mail.subject).to eql("Is this goodbye?")
      expect(mail.to).to eql([user.email])
    end
  end

  describe "send goal deadline reminder email" do
    let(:mail) do
      described_class.with(goal: goal, user: user).send_goal_deadline_reminder_email
    end

    let(:goal) { create :goal, due_date: Date.current }

    it "renders the header" do
      expect(mail.subject).to eql("Your goal's deadline is today!")
      expect(mail.to).to eql([user.email])
    end
  end

  describe "send goal due in one month reminder email" do
    let(:mail) do
      described_class.with(goal: goal, user: user).send_goal_due_in_one_month_reminder_email
    end

    let(:goal) { create :goal, due_date: 30.days.after }

    it "renders the header" do
      expect(mail.subject).to eql("Your goal's deadline is in one month!")
      expect(mail.to).to eql([user.email])
    end
  end

  describe "send goal 15 days past due date reminder email" do
    let(:mail) do
      described_class.with(goal: goal, user: user).send_goal_15_days_past_due_date_reminder_email
    end

    let(:goal) { create :goal, due_date: 15.days.ago }

    it "renders the header" do
      expect(mail.subject).to eql("Your goal's deadline was 15 days ago!")
      expect(mail.to).to eql([user.email])
    end
  end

  describe "send goal 30 days past due date reminder email" do
    let(:mail) do
      described_class.with(goal: goal, user: user).send_goal_30_days_past_due_date_reminder_email
    end

    let(:goal) { create :goal, due_date: 30.days.ago }

    it "renders the header" do
      expect(mail.subject).to eql("Your Goal's Journey: Past Its Due Date, What's Next?")
      expect(mail.to).to eql([user.email])
    end
  end

  describe "send opportunities open roles email" do
    let(:mail) do
      described_class.with(user: user).send_opportunities_open_roles_email
    end

    it "renders the header" do
      expect(mail.subject).to eql("We have open roles for you!")
      expect(mail.to).to eql([user.email])
    end
  end
end
