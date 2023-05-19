require "rails_helper"

RSpec.describe WithPersona::ApproveInquiry do
  subject(:approve_inquiry) do
    described_class.new(
      talent: talent,
      inquiry_first_name: inquiry_first_name,
      inquiry_last_name: inquiry_last_name
    ).call
  end

  let(:inquiry_first_name) { "ruben" }
  let(:inquiry_last_name) { "dinis" }
  let(:user) { create :user, legal_first_name: legal_first_name, legal_last_name: legal_last_name, invited: invite }
  let!(:talent) { create :talent, user: user, verified: false, with_persona_id: "123" }
  let(:invite) { create :invite }

  let(:task_update_class) { Tasks::Update }
  let(:task_update_instance) { instance_double(task_update_class, call: true) }

  let(:credit_points_class) { ParticipationPoints::CreditInvitePoints }
  let(:credit_points_instance) { instance_double(credit_points_class, call: true) }

  before do
    allow(task_update_class).to receive(:new).and_return(task_update_instance)
    allow(credit_points_class).to receive(:new).and_return(credit_points_instance)
  end

  context "when the inquiry names match the user names" do
    let(:legal_first_name) { "Ruben" }
    let(:legal_last_name) { "Dinis" }

    it "verifies the talent" do
      approve_inquiry

      expect(talent.reload.verified).to eq true
    end

    it "keeps the with persona field" do
      approve_inquiry

      expect(talent.reload.with_persona_id).to eq "123"
    end

    it "initializes and calls the credit points service" do
      approve_inquiry

      expect(credit_points_class).to have_received(:new).with(
        invite: invite
      )
      expect(credit_points_instance).to have_received(:call)
    end

    it "initializes and calls the tasks update service" do
      approve_inquiry

      expect(task_update_class).to have_received(:new)
      expect(task_update_instance).to have_received(:call).with(
        type: "Tasks::Verified",
        user: user
      )
    end

    context "when the user was not invited" do
      let(:invite) { nil }

      it "does not initialize the credit points service" do
        approve_inquiry

        expect(credit_points_class).not_to have_received(:new)
      end
    end
  end

  context "when the inquiry names don't match the user names" do
    let(:legal_first_name) { "Ruben" }
    let(:legal_last_name) { "Antunes" }
    let(:create_notification_class) { CreateNotification }
    let(:create_notification_instance) { instance_double(create_notification_class, call: true) }

    before do
      allow(create_notification_class).to receive(:new).and_return(create_notification_instance)
      allow(Rollbar).to receive(:warning)
    end

    it "does not verify the talent" do
      approve_inquiry

      expect(talent.reload.verified).to eq false
    end

    it "clears the with persona field" do
      approve_inquiry

      expect(talent.reload.with_persona_id).to eq nil
    end

    it "does not initialize the tasks update service" do
      approve_inquiry

      expect(task_update_class).not_to have_received(:new)
    end

    it "initializes and calls the notification service" do
      approve_inquiry

      expect(create_notification_class).to have_received(:new)
      expect(create_notification_instance).to have_received(:call).with(
        recipient: user,
        source_id: user.id,
        type: UserNamesVerificationFailedNotification,
        extra_params: {reason: "name", with_persona_id: "123"}
      )
    end

    it "raises an warning to Rollbar with extra data" do
      approve_inquiry

      expect(Rollbar).to have_received(:warning).with(
        "Persona names mismatch",
        legal_first_name: legal_first_name,
        legal_last_name: legal_last_name,
        inquiry_first_name: inquiry_first_name,
        inquiry_last_name: inquiry_last_name,
        user_id: user.id,
        with_persona_id: "123"
      )
    end
  end
end
