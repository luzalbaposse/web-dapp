require "rails_helper"

RSpec.describe ExperiencePoints::CreditInvitePoints do
  subject(:credit_invite_points) { described_class.new(invite: invite).call }

  let(:inviter) { create :user }
  let(:invite) { create :invite, user: inviter, code: "test" }

  let!(:invited_user_one) { create :user, talent: talent_one, invite_id: invite.id, created_at: described_class::START_DATE + 2.months }
  let(:talent_one) { create :talent, verified: true }

  let!(:invited_user_two) { create :user, talent: talent_two, invite_id: invite.id, created_at: described_class::START_DATE - 1 }
  let(:talent_two) { create :talent, verified: true }

  let!(:invited_user_three) { create :user, talent: talent_three, invite_id: invite.id, created_at: described_class::START_DATE + 1 }
  let(:talent_three) { create :talent, verified: true }

  let!(:invited_user_four) { create :user, talent: talent_four, invite_id: invite.id, created_at: described_class::START_DATE + 10.days }
  let(:talent_four) { create :talent, verified: false }

  it "creates two participation points for the inviter" do
    expect { credit_invite_points }.to change(ExperiencePoint, :count).from(0).to(2)
  end

  it "creates the participation points with the expected data" do
    freeze_time do
      credit_invite_points

      points = ExperiencePoint.where(user: inviter, source: invite)

      aggregate_failures do
        expect(points.pluck(:amount).uniq).to eq([described_class::AMOUNT])
        expect(points.pluck(:description).uniq).to eq(["Invite test used."])
        expect(points.pluck(:credited_at).uniq).to eq([Time.current])
      end
    end
  end

  context "when one of the points is already credited" do
    before do
      create :experience_point, source: invite, user: inviter, amount: 250, credited_at: described_class::START_DATE + 2.days, description: "test"
    end

    it "only creates the missing participation point for the inviter" do
      expect { credit_invite_points }.to change(ExperiencePoint, :count).from(1).to(2)
    end
  end
end
