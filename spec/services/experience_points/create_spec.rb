require "rails_helper"

RSpec.describe ExperiencePoints::Create do
  subject(:create_point) do
    described_class.new(
      user: user,
      source: source,
      amount: amount,
      description: description,
      credited_at: credited_at
    ).call
  end

  let(:user) { create :user }
  let(:source) { create :invite }
  let(:amount) { 100 }
  let(:description) { "Point credited" }
  let(:credited_at) { Time.current }

  it "creates the participation point" do
    expect { create_point }.to change(ExperiencePoint, :count).from(0).to(1)
  end

  it "creates the participation point with the expected data" do
    point = create_point

    aggregate_failures do
      expect(point.amount).to eq(amount)
      expect(point.user).to eq(user)
      expect(point.source).to eq(source)
      expect(point.description).to eq(description)
      expect(point.credited_at).to eq(credited_at)
    end
  end

  it "sets the user experience points" do
    create_point

    expect(user.reload.experience_points_amount).to eq(amount)
  end

  context "when the user already has experience points" do
    before do
      create :experience_point, user: user, source: source, amount: 250, credited_at: Date.yesterday, description: "Invite Points"
      create :experience_point, user: user, source: source, amount: 250, credited_at: Date.yesterday, description: "Invite Points"
      create :experience_point, user: user, source: source, amount: 250, credited_at: Date.yesterday, description: "Invite Points"
      create :experience_point, user: user, source: source, amount: 250, credited_at: Date.yesterday, description: "Invite Points"
    end

    it "updates the user experience points" do
      create_point

      expect(user.reload.experience_points_amount).to eq(1100)
    end
  end
end
