require "rails_helper"

RSpec.describe Goals::Update do
  include ActiveJob::TestHelper

  let(:goal) { create :goal, progress: Goal::PLANNED, user: }
  let(:user) { create :user }
  let(:params) { {due_date: "01-05-2023", images: [], progress:} }
  let(:progress) { Goal::DOING }

  subject { described_class.new(goal:, params:) }

  describe "#call" do
    it "updates the goal" do
      subject.call

      expect(goal.reload.progress).to eq(Goal::DOING)
    end

    it "enqueues a job to refresh user quests" do
      Sidekiq::Testing.inline! do
        subject.call

        job = enqueued_jobs.find { |j| j[:job] == Quests::RefreshUserQuestsJob }

        expect(job[:args][0]).to eq(user.id)
      end
    end

    context "when the goal is accomplished" do
      let(:progress) { Goal::ACCOMPLISHED }

      it "enqueues a job to send a notification to Discord" do
        Sidekiq::Testing.inline! do
          subject.call

          job = enqueued_jobs.find { |j| j[:job] == Discord::SendAccomplishedGoalNotificationJob }

          expect(job[:args][0]).to eq(Goal.last.id)
        end
      end
    end

    context "when the goal is not accomplished" do
      it "does not enqueue a job to send a notification to Discord" do
        Sidekiq::Testing.inline! do
          subject.call

          expect(enqueued_jobs.pluck(:job))
            .not_to include(Discord::SendAccomplishedGoalNotificationJob)
        end
      end
    end
  end
end
