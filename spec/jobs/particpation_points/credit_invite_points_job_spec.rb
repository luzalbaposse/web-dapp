require "rails_helper"

RSpec.describe ParticipationPoints::CreditInvitePointsJob, type: :job do
  let(:invite) { create :invite }

  subject(:credit_invite_points) { ParticipationPoints::CreditInvitePointsJob.perform_now(invite.id) }

  let(:credit_invite_points_class) { ParticipationPoints::CreditInvitePoints }
  let(:credit_invite_points_service) { instance_double(credit_invite_points_class, call: true) }

  before do
    allow(credit_invite_points_class).to receive(:new).and_return(credit_invite_points_service)
  end

  it "initializes and calls the credit invite points service with the correct arguments" do
    credit_invite_points

    aggregate_failures do
      expect(credit_invite_points_class).to have_received(:new).with(
        invite: invite
      )
      expect(credit_invite_points_service).to have_received(:call)
    end
  end
end
