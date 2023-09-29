require "rails_helper"

RSpec.describe Goals::Create do
  include ActiveJob::TestHelper

  subject(:create_goal) { described_class.new(user:, params:).call }

  let(:user) { create :user }
  let(:params) do
    {
      title: "New Goal",
      due_date: "01-05-2023",
      images: [],
      progress:
    }
  end

  let(:progress) { Goal::DOING }

  let(:profile_completeness_class) { Users::UpdateProfileCompleteness }
  let(:profile_completeness_instance) { instance_double(profile_completeness_class, call: true) }

  before do
    allow(profile_completeness_class).to receive(:new).and_return(profile_completeness_instance)
  end

  it "enqueues two jobs to refresh user quests" do
    Sidekiq::Testing.inline! do
      create_goal

      job = enqueued_jobs.find { |j| j["job_class"] == "Quests::RefreshUserQuestsJob" }

      aggregate_failures do
        expect(job["arguments"][0]).to eq(user.id)
      end
    end
  end

  it "initializes and calls the update profile completeness" do
    create_goal

    expect(profile_completeness_class).to have_received(:new).with(user:)
    expect(profile_completeness_instance).to have_received(:call)
  end

  context "when the goal is accomplished" do
    let(:progress) { Goal::ACCOMPLISHED }

    it "enqueues a job to send a notification to Discord" do
      Sidekiq::Testing.inline! do
        create_goal

        job = enqueued_jobs.find { |j| j[:job] == Discord::SendAccomplishedGoalNotificationJob }

        expect(job[:args][0]).to eq(Goal.last.id)
      end
    end
  end

  context "when the goal is not accomplished" do
    it "does not enqueue a job to send a notification to Discord" do
      Sidekiq::Testing.inline! do
        create_goal

        expect(enqueued_jobs.pluck(:job))
          .not_to include(Discord::SendAccomplishedGoalNotificationJob)
      end
    end
  end

  context "when there is an active election" do
    let(:org) { create(:org_election, slug: "takeoff-istanbul") }
    let!(:election) { create(:election, start_date: Time.current - 1.day, organization: org) }

    let(:params) do
      {
        title: "New Goal",
        due_date: "01-05-2023",
        images: [],
        progress:,
        election_selected: "takeoff-istanbul"
      }
    end

    it "pins the goal" do
      goal = create_goal

      expect(goal.pin).to eq true
    end

    it "adds the user to the collective" do
      create_goal

      expect(Membership.where(user: user, organization: org)).to exist
    end
  end
end
