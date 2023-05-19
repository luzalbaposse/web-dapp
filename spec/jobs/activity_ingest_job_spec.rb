require "rails_helper"

RSpec.describe ActivityIngestJob, type: :job do
  include ActiveJob::TestHelper

  let(:origin_user) { create(:user, :with_talent_token) }
  let(:target_user) { create(:user, :with_talent_token) }

  subject(:job) { described_class.perform_later("token_launch", nil, origin_user.id, target_user.id) }

  describe "#perform" do
    it "queues the job" do
      expect { job }
        .to change(ActiveJob::Base.queue_adapter.enqueued_jobs, :size).by(1)
    end

    it "queues in the default queue" do
      expect(job.queue_name).to eq("default")
    end

    it "executes perform" do
      activity_class = "Activities::TokenLaunch".constantize
      activity = activity_class.new
      activity.message = activity_class.generate_content(origin_user.id, target_user.id)
      activity.origin_user_id = origin_user.id
      activity.target_user_id = target_user.id
      activity.global = activity_class.default_global_scope

      expect_any_instance_of(Activities::TokenLaunch).to receive(:save!).and_return(true)
      perform_enqueued_jobs { job }
    end

    it "creates a new activity" do
      expect { perform_enqueued_jobs { job } }
        .to change { Activities::TokenLaunch.count }.by(1)
    end

    after do
      clear_enqueued_jobs
      clear_performed_jobs
    end
  end

  describe "with Milestones" do
    let(:provided_content) { "Provided content for activity." }
    subject(:job) { described_class.perform_later("milestone_create", provided_content, origin_user.id, target_user.id) }

    it "uses provided content over generated content" do
      activity_class = "Activities::MilestoneCreate".constantize
      activity = activity_class.new
      activity.message = provided_content
      activity.origin_user_id = origin_user.id
      activity.target_user_id = target_user.id
      activity.global = activity_class.default_global_scope

      expect { perform_enqueued_jobs { job } }
        .to change { Activities::MilestoneCreate.count }.by(1)
      expect(Activities::MilestoneCreate.last.message).to eq(provided_content)
    end
  end
end
