require "rails_helper"

RSpec.describe Users::UpdateProfileCompletedAt do
  describe "#call" do
    subject(:update_profile_completed_at) { described_class.new(user: user).call }

    let(:user) { create :user, display_name: display_name, profile_completed_at: profile_completed_at }
    let!(:talent) { create :talent, user: user }
    let(:display_name) { "Test Talent" }
    let(:profile_completed_at) { nil }

    context "when all profile fields are present" do
      before do
        talent.occupation = "Tester"
        talent.headline = "Great tester with lots of experience"
        talent.save!

        create :milestone, talent: talent
        career_goal = create :career_goal, pitch: "I'm a great tester", talent: talent
        create :goal, career_goal: career_goal, due_date: Date.tomorrow

        tag = create :tag, description: "web3", hidden: false
        user.tags << tag

        allow_any_instance_of(User).to receive(:profile_picture_url).and_return("https://path_to_image")
      end

      it "updates the user timestamp" do
        freeze_time do
          expect { update_profile_completed_at }.to change(user.reload, :profile_completed_at).from(nil).to(Time.current)
        end
      end

      context "when the user already has the timestamp populated" do
        let(:profile_completed_at) { Time.new(2022, 10, 5) }

        it "keeps the user timestamp" do
          update_profile_completed_at

          expect(user.reload.profile_completed_at).to eq profile_completed_at
        end
      end
    end

    context "when some profile fields are missing" do
      context "when the user already has the timestamp populated" do
        let(:profile_completed_at) { Time.new(2022, 10, 5) }

        it "removes the user timestamp" do
          expect { update_profile_completed_at }.to change(user.reload, :profile_completed_at).from(profile_completed_at).to(nil)
        end
      end
    end
  end
end
