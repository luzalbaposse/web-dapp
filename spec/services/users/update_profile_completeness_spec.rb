require "rails_helper"

RSpec.describe Users::UpdateProfileCompleteness do
  include ActiveJob::TestHelper

  describe "#call" do
    subject(:update_profile_completed_at) { described_class.new(user: user).call }

    let(:user) { create :user, display_name: display_name, profile_completed_at: profile_completed_at }
    let!(:talent) { create :talent, user: user }
    let(:display_name) { "Test Talent" }
    let(:profile_completed_at) { nil }

    let(:create_notification_class) { CreateNotification }
    let(:create_notification_instance) { instance_double(create_notification_class, call: true) }

    before do
      allow(create_notification_class).to receive(:new).and_return(create_notification_instance)
    end

    context "when all profile fields are present" do
      before do
        talent.occupation = "Tester"
        talent.headline = "Great tester with lots of experience"
        talent.website = "my_website.com"
        talent.verified = true
        talent.save!

        create :milestone, talent: talent
        career_goal = create :career_goal, talent: talent
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

      it "updates the user profile completeness amount" do
        update_profile_completed_at

        expect(user.reload.profile_completeness).to eq 1
      end

      it "initializes and calls the create notification to all supporters" do
        update_profile_completed_at

        expect(create_notification_class).to have_received(:new)
        expect(create_notification_instance).to have_received(:call).with(
          recipient: user,
          source_id: user.id,
          type: CompletedProfileNotification
        )
      end

      it "enqueues a job to create the user activity" do
        Sidekiq::Testing.inline! do
          update_profile_completed_at

          job = enqueued_jobs.find { |j| j["job_class"] == "ActivityIngestJob" }

          aggregate_failures do
            expect(job["arguments"]).to match_array(["profile_complete", nil, user.id])
          end
        end
      end

      context "when the user already has the timestamp populated" do
        let(:profile_completed_at) { Time.new(2022, 10, 5) }

        it "keeps the user timestamp" do
          update_profile_completed_at

          expect(user.reload.profile_completed_at).to eq profile_completed_at
        end

        it "updates the user profile completeness amount" do
          update_profile_completed_at

          expect(user.reload.profile_completeness).to eq 1
        end

        it "does not initialize the create notification" do
          update_profile_completed_at

          expect(create_notification_class).not_to have_received(:new)
        end
      end
    end

    context "when some profile fields are missing" do
      it "updates the user profile completeness amount" do
        update_profile_completed_at

        required_fields_count = User::REQUIRED_PROFILE_FIELDS.count + 1

        expect(user.reload.profile_completeness).to eq(2.to_f / required_fields_count)
      end

      context "when the user already has the timestamp populated" do
        let(:profile_completed_at) { Time.new(2022, 10, 5) }

        it "removes the user timestamp" do
          expect { update_profile_completed_at }.to change(user.reload, :profile_completed_at).from(profile_completed_at).to(nil)
        end

        it "does not initialize the create notification" do
          update_profile_completed_at

          expect(create_notification_class).not_to have_received(:new)
        end
      end
    end
  end
end
