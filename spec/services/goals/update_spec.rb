require "rails_helper"

RSpec.describe Goals::Update do
  include ActiveJob::TestHelper

  subject(:update_goal) { described_class.new(goal:, params:).call }

  let(:user) { create :user }
  let(:goal) { create :goal, user: user }
  let(:params) do
    {
      due_date: "01-05-2023",
      title: "New title",
      images: [],
      progress:
    }
  end

  let(:user) { create :user }
  let(:goal) { create :goal, progress: Goal::PLANNED, user: }
  let(:progress) { Goal::DOING }

  describe "#call" do
    it "updates the goal" do
      update_goal

      expect(goal.reload.progress).to eq(Goal::DOING)
    end

    it "enqueues a job to refresh user quests" do
      Sidekiq::Testing.inline! do
        update_goal

        job = enqueued_jobs.find { |j| j[:job] == Quests::RefreshUserQuestsJob }

        expect(job[:args][0]).to eq(user.id)
      end
    end

    context "when the goal is accomplished" do
      let(:progress) { Goal::ACCOMPLISHED }

      it "enqueues a job to send a notification to Discord" do
        Sidekiq::Testing.inline! do
          update_goal

          job = enqueued_jobs.find { |j| j[:job] == Discord::SendAccomplishedGoalNotificationJob }

          expect(job[:args][0]).to eq(Goal.last.id)
        end
      end
    end

    context "when the goal is not accomplished" do
      it "does not enqueue a job to send a notification to Discord" do
        Sidekiq::Testing.inline! do
          update_goal

          expect(enqueued_jobs.pluck(:job))
            .not_to include(Discord::SendAccomplishedGoalNotificationJob)
        end
      end
    end

    it "enqueues two jobs to update activity" do
      Sidekiq::Testing.inline! do
        update_goal

        job = enqueued_jobs.find { |j| j["job_class"] == "ActivityIngestJob" }

        aggregate_failures do
          expect(job["arguments"][0]).to eq("goal_update")
          expect(job["arguments"][1]).to eq("@origin updated the goal \"New title\" to \"doing\".")
          expect(job["arguments"][2]).to eq(goal.user_id)
        end
      end
    end
  end
end
